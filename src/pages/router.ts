import * as octant from '../octant/plugin';
import { OverviewPage } from './overview-page';
import { ContentPage, NotFoundPage } from './page';

export class Router {
  pages: ContentPage[];

  constructor(...pages: ContentPage[]) {
    this.pages = pages;
  }

  route(req: string): octant.ContentResponse {
    const contentPath = req.length === 0 ? '/' : req;
    const page = this.pages.find(p => p.paths.includes(contentPath));
    if (!page) {
      return new NotFoundPage(contentPath).content();
    }

    return page.content();
  }
}

export const defaultRouter = (): Router => {
  return new Router(new OverviewPage());
};
