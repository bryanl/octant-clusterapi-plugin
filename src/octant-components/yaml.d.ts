import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface YAMLConfig {
    data?: string;
}
export interface YAMLOptions {
    data?: string;
}
interface YAMLParameters {
    options?: YAMLOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class YAMLFactory implements ComponentFactory<YAMLConfig> {
    private readonly data;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: YAMLParameters);
    toComponent(): Component<YAMLConfig>;
}
export {};
