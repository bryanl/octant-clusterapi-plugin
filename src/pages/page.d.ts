import * as octant from '../octant/plugin';
export interface Page {
    content(req: octant.ContentRequest, namespace: string): octant.ContentResponse;
}
export interface ContentPage extends Page {
    paths: string[];
}
export declare class NotFoundPage implements Page {
    path: string;
    constructor(path: string);
    content(req: octant.ContentRequest, namespace: string): octant.ContentResponse;
}
