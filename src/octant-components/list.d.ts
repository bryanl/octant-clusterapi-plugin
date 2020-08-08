import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface ListConfig {
    items: Component<any>[];
}
interface ListParameters {
    items: Component<any>[];
    factoryMetadata?: FactoryMetadata;
}
export declare class ListFactory implements ComponentFactory<ListConfig> {
    private readonly items;
    private readonly factoryMetadata;
    constructor({ items, factoryMetadata }: ListParameters);
    toComponent(): Component<ListConfig>;
}
export {};
