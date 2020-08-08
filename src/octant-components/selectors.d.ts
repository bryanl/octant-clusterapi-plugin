import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface SelectorsConfig {
    selectors: any[];
}
interface SelectorsParameters {
    selectors: any[];
    factoryMetadata?: FactoryMetadata;
}
export declare class SelectorsFactory implements ComponentFactory<SelectorsConfig> {
    private readonly selectors;
    private readonly factoryMetadata;
    constructor({ selectors, factoryMetadata }: SelectorsParameters);
    toComponent(): Component<SelectorsConfig>;
}
export {};
