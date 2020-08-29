import * as octant from '../octant/plugin';
import { ObjectRequest, Printer } from './objects';
import { Item, PrintResponse } from '../components/print-response';
import * as c from '../octant/components';
import { TextConfig, TextFactory } from '../octant-components/text';
import { CardConfig, CardFactory } from '../octant-components/card';
import { Component } from '../octant-components/component';
import {
  genLink,
  genLinkFromObject,
  Ref,
} from '../octant-components/api-extra';
import { createColumn, TableFactory } from '../components/table';
import { TimestampFactory } from '../octant-components/timestamp';

type printItemFn = (
  clusterObject: ClusterObject,
  dashboardClient: octant.DashboardClient
) => Component<any>;

interface ClusterObject {
  metadata: any;
  apiVersion: string;
  spec: {
    clusterNetwork: {
      pods: {
        cidrBlocks: string[];
      };
    };
    controlPlaneEndpoint: {
      host: string;
      port: number;
    };
    controlPlaneRef: Ref;
    infrastructureRef: Ref;
  };
}

export class Cluster implements Printer {
  constructor() {}

  print(
    dashboardClient: octant.DashboardClient,
    req: ObjectRequest
  ): PrintResponse {
    const resp = new PrintResponse();

    const clusterObject = JSON.parse(
      JSON.stringify(req.object)
    ) as ClusterObject;

    // const labelSelector = {
    //   matchExpressions: [
    //     {
    //       key: 'cluster.x-k8s.io/cluster-name',
    //       operator: 'In',
    //       values: [clusterObject.metadata.name],
    //     },
    //     {
    //       key: 'cluster.x-k8s.io/control-plane',
    //       operator: 'Exists',
    //     },
    //   ],
    // };
    //
    // const cpMachines = dashboardClient.List({
    //   namespace: clusterObject.metadata.namespace,
    //   apiVersion: clusterObject.apiVersion,
    //   kind: 'Machine',
    //   labelSelector,
    // });
    // console.log(
    //   'got cp machines',
    //   JSON.stringify({ cpMachines, selector: labelSelector })
    // );

    const itemFns: printItemFn[] = [
      this.printClusterNetwork,
      this.printControlPlaneEndpoint,
      this.printControlPlaneMachines,
      this.printWorkerMachines,
    ];

    resp.addConfig({
      header: `Control Plane (${clusterObject.spec.controlPlaneRef.kind})`,
      content: genLink(clusterObject.spec.controlPlaneRef, dashboardClient),
    });
    resp.addConfig({
      header: `Infrastructure (${clusterObject.spec.infrastructureRef.kind})`,
      content: genLink(clusterObject.spec.infrastructureRef, dashboardClient),
    });

    resp.addItems(
      ...itemFns.map(
        itemFn => new Item(c.Width.Half, itemFn(clusterObject, dashboardClient))
      )
    );

    return resp;
  }

  printClusterNetwork(
    clusterObject: ClusterObject,
    dashboardClient: octant.DashboardClient
  ): Component<CardConfig> {
    const body = new TextFactory({
      value: convertToJSON(clusterObject.spec.clusterNetwork),
      options: { isMarkdown: true },
    });

    return new CardFactory({
      body: body.toComponent(),
      factoryMetadata: {
        title: createTitleFromText('Cluster Network'),
      },
    }).toComponent();
  }

  printControlPlaneEndpoint(
    clusterObject: ClusterObject,
    dashboardClient: octant.DashboardClient
  ): Component<CardConfig> {
    const body = new TextFactory({
      value: convertToJSON(clusterObject.spec.controlPlaneEndpoint),
      options: { isMarkdown: true },
    });

    return new CardFactory({
      body: body.toComponent(),
      factoryMetadata: {
        title: createTitleFromText('Control Plane Endpoint'),
      },
    }).toComponent();
  }

  printControlPlaneMachines(
    clusterObject: ClusterObject,
    dashboardClient: octant.DashboardClient
  ): Component<CardConfig> {
    const machines = listMachines(
      clusterObject,
      dashboardClient,
      MachineType.ControlPlane
    );

    const body = machineTable(machines, dashboardClient);

    return new CardFactory({
      body: body.toComponent(),
      factoryMetadata: {
        title: createTitleFromText('Control Plane Machines'),
      },
    }).toComponent();
  }

  printWorkerMachines(
    clusterObject: ClusterObject,
    dashboardClient: octant.DashboardClient
  ): Component<CardConfig> {
    const machines = listMachines(
      clusterObject,
      dashboardClient,
      MachineType.Worker
    );

    const body = machineTable(machines, dashboardClient);

    return new CardFactory({
      body: body.toComponent(),
      factoryMetadata: {
        title: createTitleFromText('Worker Machines'),
      },
    }).toComponent();
  }
}

const convertToJSON = (object: any): string => {
  return '```json' + '\n' + JSON.stringify(object) + '\n' + '```';
};

const createTitleFromText = (...args: string[]): Component<TextConfig>[] => {
  return args.map<Component<TextConfig>>(value =>
    new TextFactory({ value }).toComponent()
  );
};

enum MachineType {
  All,
  ControlPlane,
  Worker,
}

interface MatchExpression {
  key: string;
  operator: string;
  values?: string[];
}

const machineTable: (
  machines: any[],
  dashboardClient: octant.DashboardClient
) => TableFactory = (
  machines: any[],
  dashboardClient: octant.DashboardClient
) => {
  const rows = machines
    .sort((a, b) => (a.metadata.name <= b.metadata.name ? -1 : 1))
    .map(object => {
      const link = genLinkFromObject(object, dashboardClient);

      const age = new TimestampFactory({
        timestamp: new Date(object.metadata.creationTimestamp).getTime() / 1000,
      });

      return {
        Name: link,
        Phase: new TextFactory({ value: object.status.phase }).toComponent(),
        Age: age.toComponent(),
      };
    });

  const columns = ['Name', 'Phase', 'Age'].map(name => createColumn(name));

  return new TableFactory([], columns, rows);
};

const listMachines = (
  clusterObject: ClusterObject,
  dashboardClient: octant.DashboardClient,
  machineType: MachineType
) => {
  const matchExpressions: MatchExpression[] = [
    {
      key: 'cluster.x-k8s.io/cluster-name',
      operator: 'In',
      values: [clusterObject.metadata.name],
    },
  ];

  switch (machineType) {
    case MachineType.ControlPlane:
      matchExpressions.push({
        key: 'cluster.x-k8s.io/control-plane',
        operator: 'Exists',
      });
      break;
    case MachineType.Worker:
      matchExpressions.push({
        key: 'cluster.x-k8s.io/control-plane',
        operator: 'DoesNotExist',
      });
      break;
  }

  return dashboardClient.List({
    namespace: clusterObject.metadata.namespace,
    apiVersion: clusterObject.apiVersion,
    kind: 'Machine',
    labelSelector: {
      matchExpressions,
    },
  });
};
