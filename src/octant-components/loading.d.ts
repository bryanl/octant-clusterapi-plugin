import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface LoadingConfig {
    value: string;
}
interface LoadingParameters {
    value: string;
    factoryMetadata?: FactoryMetadata;
}
export declare class LoadingFactory implements ComponentFactory<LoadingConfig> {
    private readonly value;
    private readonly factoryMetadata;
    constructor({ value, factoryMetadata }: LoadingParameters);
    toComponent(): Component<LoadingConfig>;
}
export {};
