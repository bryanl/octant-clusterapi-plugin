import { DashboardClient } from '../octant/plugin';
import { PrintResponse } from '../components/print-response';
import { Cluster } from './cluster';

export interface KubernetesObject {
  apiVersion: string;
  kind: string;
  metadata: any;
}

export interface Printer {
  print(dashboardClient: DashboardClient, req: ObjectRequest): PrintResponse;
}

class EmptyPrinter implements Printer {
  print(dashboardClient: DashboardClient, req: ObjectRequest): PrintResponse {
    return new PrintResponse();
  }
}

export interface ObjectRequest {
  readonly object: KubernetesObject;
  readonly client: DashboardClient;
}

export class ObjectPrinter {
  constructor(private req: any) {}

  print(dashboardClient: DashboardClient): PrintResponse {
    const printer = this.findPrinter();
    return printer.print(dashboardClient, this.req);
  }

  private findPrinter() {
    const objectRequest = JSON.parse(JSON.stringify(this.req)) as ObjectRequest;
    const object = objectRequest.object;

    if (
      object.apiVersion === 'cluster.x-k8s.io/v1alpha3' &&
      object.kind === 'Cluster'
    ) {
      return new Cluster();
    }

    return new EmptyPrinter();
  }
}
