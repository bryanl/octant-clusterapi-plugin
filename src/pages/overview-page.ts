import * as octant from '../octant/plugin';
import { ContentPage } from './page';
import { createContentResponse } from '../components/content';
import { createColumn, TableFactory } from '../components/table';
import { TextFactory } from '../octant-components/text';
import { DashboardClient } from '../octant/plugin';
import { LinkFactory } from '../octant-components/link';
import { genLinkFromObject } from '../octant-components/api-extra';

export class OverviewPage implements ContentPage {
  constructor(private dashboardClient: DashboardClient) {}

  paths = ['/', '/overview'];

  content(
    req: octant.ContentRequest,
    namespace: string
  ): octant.ContentResponse {
    const key: octant.Key = {
      apiVersion: 'cluster.x-k8s.io/v1alpha3',
      kind: 'Cluster',
      namespace: namespace,
    };

    const objects = this.dashboardClient.List(key);

    const rows = objects.map(object => {
      const link = genLinkFromObject(object, this.dashboardClient);

      return {
        Name: link,
        Phase: new TextFactory({ value: object.status.phase }).toComponent(),
        'Control Plane Initialized': new TextFactory({
          value: String(object.status.controlPlaneInitialized),
        }).toComponent(),
        'Infrastructure Ready': new TextFactory({
          value: String(object.status.infrastructureReady),
        }).toComponent(),
      };
    });

    const columns = [
      'Name',
      'Phase',
      'Control Plane Initialized',
      'Infrastructure Ready',
    ].map(name => createColumn(name));

    const table = new TableFactory(
      [new TextFactory({ value: 'Clusters' })],
      columns,
      rows
    );

    return createContentResponse(
      [new TextFactory({ value: 'ClusterAPI Overview' })],
      [table]
    );
  }
}
