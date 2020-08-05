import * as octant from '../octant/plugin';
import { OverviewPage } from './overview-page';
import { ContentPage, NotFoundPage } from './page';

export class Router {
  pages: ContentPage[];

  constructor(...pages: ContentPage[]) {
    this.pages = pages;
  }

  route(req: octant.ContentRequest, namespace: string): octant.ContentResponse {
    const contentPath = req.contentPath.length === 0 ? '/' : req.contentPath;
    const page = this.pages.find(p => p.paths.includes(contentPath));
    if (!page) {
      return new NotFoundPage(contentPath).content(req, namespace);
    }

    return page.content(req, namespace);
  }
}

export const defaultRouter = (): Router => {
  return new Router(new OverviewPage());
};
