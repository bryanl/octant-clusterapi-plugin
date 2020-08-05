import { TextFactory } from '../components/textFactory';
import * as octant from '../octant/plugin';
import { ContentPage } from './page';
import { createContentResponse } from '../components/content';
import { createColumn, TableFactory } from '../components/table';

export class OverviewPage implements ContentPage {
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

    const objects = req.client.List(key);

    const rows = objects.map(object => {
      return {
        Name: new TextFactory(object.metadata.name).toComponent(),
        Phase: new TextFactory(object.status.phase).toComponent(),
        'Control Plane Initialized': new TextFactory(
          String(object.status.controlPlaneInitialized)
        ).toComponent(),
        'Infrastructure Ready': new TextFactory(
          String(object.status.infrastructureReady)
        ).toComponent(),
      };
    });

    const columns = [
      'Name',
      'Phase',
      'Control Plane Initialized',
      'Infrastructure Ready',
    ].map(name => createColumn(name));

    const table = new TableFactory(
      [new TextFactory('Clusters')],
      columns,
      rows
    );

    return createContentResponse(
      [new TextFactory('ClusterAPI Overview')],
      [table]
    );
  }
}
