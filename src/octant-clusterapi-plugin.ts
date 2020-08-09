// core-js and regenerator-runtime are required to ensure the correct polyfills
// are applied by babel/webpack.
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// plugin contains interfaces your plugin can expect
// this includes your main plugin class, response, requests, and clients.
import * as octant from './octant/plugin';
import { Capabilities, GroupVersionKind } from './octant/plugin';

// components containers helpers for generating the
// objects that Octant can render to components.
import * as c from './octant/components';

// rxjs is used to show that Observables function within
// the Octant JavaScript runtime.
import { BehaviorSubject } from 'rxjs';
import { ObjectPrinter } from './objects/objects';
import { defaultRouter, Router } from './pages/router';

const versions: GroupVersionKind[] = [
  {
    group: 'cluster.x-k8s.io',
    version: 'v1alpha3',
    kind: 'Cluster',
  },
];

// TODO: is export default what is needed here?
export default class MyPlugin implements octant.Plugin {
  // Static fields that Octant uses
  name = 'octant-clusterapi-plugin';
  description = 'ClusterAPI support for Octant';

  // If true, the contentHandler and navigationHandler will be called.
  isModule = true;

  // Octant will assign these via the constructor at runtime.
  dashboardClient: octant.DashboardClient;
  httpClient: octant.HTTPClient;

  // Plugin capabilities
  get capabilities(): Capabilities {
    return {
      supportPrinterConfig: versions,
    };
  }

  // Custom plugin properties
  actionCount: number;
  currentNamespace: BehaviorSubject<string>;

  private router: Router;

  // Octant expects plugin constructors to accept two arguments, the dashboardClient and the httpClient
  constructor(
    dashboardClient: octant.DashboardClient,
    httpClient: octant.HTTPClient
  ) {
    this.dashboardClient = dashboardClient;
    this.httpClient = httpClient;

    // set initial actionCount
    this.actionCount = 0;
    this.currentNamespace = new BehaviorSubject('default');

    this.router = defaultRouter(dashboardClient);
  }

  printHandler(request: octant.ObjectRequest): octant.PrintResponse {
    const printer = new ObjectPrinter(request);
    const resp = printer.print(this.dashboardClient);
    return resp.toObject();
  }

  actionHandler(request: octant.ActionRequest): octant.ActionResponse | void {
    if (request.actionName === 'octant-clusterapi-plugin/testAction') {
      this.actionCount += 1;
      return;
    }

    if (request.actionName === 'action.octant.dev/setNamespace') {
      this.currentNamespace.next(request.payload.namespace);
      return;
    }

    return;
  }

  navigationHandler(): octant.Navigation {
    let nav = new c.Navigation(
      'Cluster API',
      'octant-clusterapi-plugin',
      'cluster'
    );

    return nav;
  }

  contentHandler(request: octant.ContentRequest): octant.ContentResponse {
    let namespace = this.currentNamespace.getValue();
    return this.router.route(request, namespace);
  }
}

console.log('loading octant-clusterapi-plugin.ts');
