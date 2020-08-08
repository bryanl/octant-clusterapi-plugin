import { DashboardClient } from '../octant/plugin';
import { PrintResponse } from '../components/print-response';
export interface KubernetesObject {
    apiVersion: string;
    kind: string;
}
export interface Printer {
    print(req: ObjectRequest): PrintResponse;
}
export interface ObjectRequest {
    readonly object: KubernetesObject;
    readonly client: DashboardClient;
}
export declare class ObjectPrinter {
    private req;
    constructor(req: any);
    print(): PrintResponse;
    private findPrinter;
}
