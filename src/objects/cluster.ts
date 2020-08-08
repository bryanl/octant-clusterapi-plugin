import { ObjectRequest, Printer } from './objects';
import { Item, PrintResponse } from '../components/print-response';
import * as c from '../octant/components';
import { TextFactory } from '../octant-components/text';
import { CardConfig, CardFactory } from '../octant-components/card';
import { Component } from '../octant-components/component';
import { LinkConfig, LinkFactory } from '../octant-components/link';

type printItemFn = (clusterObject: ClusterObject) => Component<any>;

interface Ref {
  apiVersion: string;
  kind: string;
  name: string;
  namespace: string;
}

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
  constructor(private req: ObjectRequest) {}

  print(req: ObjectRequest): PrintResponse {
    console.log('!!!!print cluster');
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
      content: genLink(clusterObject.spec.controlPlaneRef),
    });
    resp.addConfig({
      header: `Infrastructure (${clusterObject.spec.infrastructureRef.kind})`,
      content: genLink(clusterObject.spec.infrastructureRef),
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

const genLink = (ref: Ref): Component<LinkConfig> => {
  const kind = plurals[ref.kind];
  if (!kind) {
    throw `unable to find plural for ${ref.kind}`;
  }

  const linkRef = `/overview/namespace/${ref.namespace}/custom-resources/${kind}.${ref.apiVersion}/${ref.name}?`;
  console.log(linkRef);
  return new LinkFactory({ value: ref.name, ref: linkRef }).toComponent();
};

const plurals: { [key: string]: string } = {
  KubeadmControlPlane: 'kubeadmcontrolplanes',
  VSphereCluster: 'vsphereclusters',
};
