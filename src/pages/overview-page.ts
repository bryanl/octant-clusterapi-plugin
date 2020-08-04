import { TextFactory } from '../components/textFactory';
import * as octant from '../octant/plugin';
import { ContentPage } from './page';
import { createContentResponse } from '../components/content';

export class OverviewPage implements ContentPage {
  paths = ['/', '/overview'];

  content(): octant.ContentResponse {
    return createContentResponse(
      [new TextFactory('ClusterAPI Overview')],
      [new TextFactory('hello world')]
    );
  }
}
