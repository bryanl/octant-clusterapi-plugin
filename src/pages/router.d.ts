import * as octant from '../octant/plugin';
import { ContentPage } from './page';
import { DashboardClient } from '../octant/plugin';
export declare class Router {
    pages: ContentPage[];
    constructor(...pages: ContentPage[]);
    route(req: octant.ContentRequest, namespace: string): octant.ContentResponse;
}
export declare const defaultRouter: (dashboardClient: DashboardClient) => Router;
