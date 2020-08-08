import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface ExtensionConfig {
    tabs: {
        tab: Component<any>;
        payload?: {
            [key: string]: any;
        };
    }[];
}
interface ExtensionParameters {
    tabs: {
        tab: Component<any>;
        payload?: {
            [key: string]: any;
        };
    }[];
    factoryMetadata?: FactoryMetadata;
}
export declare class ExtensionFactory implements ComponentFactory<ExtensionConfig> {
    private readonly tabs;
    private readonly factoryMetadata;
    constructor({ tabs, factoryMetadata }: ExtensionParameters);
    toComponent(): Component<ExtensionConfig>;
}
export {};
