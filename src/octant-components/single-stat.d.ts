import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface SingleStatConfig {
    title: string;
    value: {
        text: string;
        color: string;
    };
}
interface SingleStatParameters {
    title: string;
    value: {
        text: string;
        color: string;
    };
    factoryMetadata?: FactoryMetadata;
}
export declare class SingleStatFactory implements ComponentFactory<SingleStatConfig> {
    private readonly title;
    private readonly value;
    private readonly factoryMetadata;
    constructor({ title, value, factoryMetadata }: SingleStatParameters);
    toComponent(): Component<SingleStatConfig>;
}
export {};
