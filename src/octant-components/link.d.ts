import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface LinkConfig {
    value: string;
    ref: string;
    status?: number;
    statusDetail?: Component<any>;
}
export interface LinkOptions {
    status?: number;
    statusDetail?: Component<any>;
}
interface LinkParameters {
    value: string;
    ref: string;
    options?: LinkOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class LinkFactory implements ComponentFactory<LinkConfig> {
    private readonly value;
    private readonly ref;
    private readonly status;
    private readonly statusDetail;
    private readonly factoryMetadata;
    constructor({ value, ref, options, factoryMetadata }: LinkParameters);
    toComponent(): Component<LinkConfig>;
}
export {};
