import * as octant from '../octant/plugin';
import { ContentPage } from './page';
import { DashboardClient } from '../octant/plugin';
export declare class OverviewPage implements ContentPage {
    private dashboardClient;
    constructor(dashboardClient: DashboardClient);
    paths: string[];
    content(req: octant.ContentRequest, namespace: string): octant.ContentResponse;
}
