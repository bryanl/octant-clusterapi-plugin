import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface GraphvizConfig {
    dot?: string;
}
export interface GraphvizOptions {
    dot?: string;
}
interface GraphvizParameters {
    options?: GraphvizOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class GraphvizFactory implements ComponentFactory<GraphvizConfig> {
    private readonly dot;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: GraphvizParameters);
    toComponent(): Component<GraphvizConfig>;
}
export {};
