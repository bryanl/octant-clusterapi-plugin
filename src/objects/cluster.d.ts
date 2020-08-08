import { ObjectRequest, Printer } from './objects';
import { PrintResponse } from '../components/print-response';
export declare class Cluster implements Printer {
    private req;
    constructor(req: ObjectRequest);
    print(req: ObjectRequest): PrintResponse;
}
