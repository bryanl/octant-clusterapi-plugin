import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as octant from './octant/plugin';
import { Capabilities } from './octant/plugin';
import { BehaviorSubject } from 'rxjs';
export default class MyPlugin implements octant.Plugin {
    name: string;
    description: string;
    isModule: boolean;
    dashboardClient: octant.DashboardClient;
    httpClient: octant.HTTPClient;
    get capabilities(): Capabilities;
    actionCount: number;
    currentNamespace: BehaviorSubject<string>;
    private router;
    constructor(dashboardClient: octant.DashboardClient, httpClient: octant.HTTPClient);
    printHandler(request: octant.ObjectRequest): octant.PrintResponse;
    actionHandler(request: octant.ActionRequest): octant.ActionResponse | void;
    navigationHandler(): octant.Navigation;
    contentHandler(request: octant.ContentRequest): octant.ContentResponse;
}
