import { ObjectRequest, Printer } from './objects';
import { TextFactory } from '../components/textFactory';
import { Card, CardFactory } from '../components/card';
import { Item, PrintResponse } from '../components/print-response';
import * as c from '../octant/components';
import { ComponentFactory } from '../components/factory';
import { Link, LinkFactory } from '../components/link';
import { SummarySection } from '../components/summary-section';

type printItemFn = (clusterObject: ClusterObject) => ComponentFactory<any>;

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
    const resp = new PrintResponse();

    const clusterObject = JSON.parse(
      JSON.stringify(req.object)
    ) as ClusterObject;

    const itemFns: printItemFn[] = [
      printClusterNetwork,
      printControlPlaneEndpoint,
    ];

    resp.addConfig(
      new SummarySection(
        `Control Plane (${clusterObject.spec.controlPlaneRef.kind})`,
        genLink(clusterObject.spec.controlPlaneRef)
      )
    );
    resp.addConfig(
      new SummarySection(
        `Infrastructure (${clusterObject.spec.infrastructureRef.kind})`,
        genLink(clusterObject.spec.infrastructureRef)
      )
    );

    resp.addItems(
      ...itemFns.map(itemFn => new Item(c.Width.Half, itemFn(clusterObject)))
    );

    return resp;
  }
}

const printClusterNetwork = (
  clusterObject: ClusterObject
): ComponentFactory<Card> => {
  const body = new TextFactory(
    convertToJSON(clusterObject.spec.clusterNetwork),
    {
      isMarkdown: true,
    }
  );
  return new CardFactory('Cluster Network', body.toComponent());
};

const printControlPlaneEndpoint = (
  clusterObject: ClusterObject
): ComponentFactory<Card> => {
  const body = new TextFactory(
    convertToJSON(clusterObject.spec.controlPlaneEndpoint),
    {
      isMarkdown: true,
    }
  );
  return new CardFactory('Control Plane Endpoint', body.toComponent());
};

const convertToJSON = (object: any): string => {
  return '```json' + '\n' + JSON.stringify(object) + '\n' + '```';
};

const genLink = (ref: Ref): ComponentFactory<Link> => {
  const kind = plurals[ref.kind];
  if (!kind) {
    throw `unable to find plural for ${ref.kind}`;
  }

  const linkRef = `/overview/namespace/${ref.namespace}/custom-resources/${kind}.${ref.apiVersion}/${ref.name}`;
  console.log(linkRef);
  return new LinkFactory(ref.name, linkRef);
};

const plurals: { [key: string]: string } = {
  KubeadmControlPlane: 'kubeadmcontrolplanes',
  VSphereCluster: 'vsphereclusters',
};
