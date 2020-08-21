import * as octant from '../octant/plugin';
import { ObjectRequest, Printer } from './objects';
import { Item, PrintResponse } from '../components/print-response';
import * as c from '../octant/components';
import { TextFactory } from '../octant-components/text';
import { CardConfig, CardFactory } from '../octant-components/card';
import { Component } from '../octant-components/component';
import { genLink, Ref } from '../octant-components/api-extra';

type printItemFn = (clusterObject: ClusterObject) => Component<any>;

interface ClusterObject {
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

    const itemFns: printItemFn[] = [
      printClusterNetwork,
      printControlPlaneEndpoint,
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
      ...itemFns.map(itemFn => new Item(c.Width.Half, itemFn(clusterObject)))
    );

    return resp;
  }
}

const printClusterNetwork = (
  clusterObject: ClusterObject
): Component<CardConfig> => {
  const body = new TextFactory({
    value: convertToJSON(clusterObject.spec.clusterNetwork),
    options: { isMarkdown: true },
  });

  return new CardFactory({
    body: body.toComponent(),
    factoryMetadata: {
      title: [new TextFactory({ value: 'Cluster Network' }).toComponent()],
    },
  }).toComponent();
};

const printControlPlaneEndpoint = (
  clusterObject: ClusterObject
): Component<CardConfig> => {
  const body = new TextFactory({
    value: convertToJSON(clusterObject.spec.controlPlaneEndpoint),
    options: { isMarkdown: true },
  });

  return new CardFactory({
    body: body.toComponent(),
    factoryMetadata: {
      title: [
        new TextFactory({ value: 'Control Plane Endpoint' }).toComponent(),
      ],
    },
  }).toComponent();
};

const convertToJSON = (object: any): string => {
  return '```json' + '\n' + JSON.stringify(object) + '\n' + '```';
};
