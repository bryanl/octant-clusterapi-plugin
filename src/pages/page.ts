import * as octant from '../octant/plugin';
import { TextFactory } from '../components/textFactory';

export interface Page {
  content(): octant.ContentResponse;
}

export interface ContentPage extends Page {
  paths: string[];
}

export class NotFoundPage implements Page {
  constructor(public path: string) {}

  content(): octant.ContentResponse {
    return {
      content: {
        title: [new TextFactory('not found').toComponent()],
        viewComponents: [
          new TextFactory(`Unable to find page ${this.path}`).toComponent(),
        ],
      },
    };
  }
}