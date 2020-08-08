import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface LabelSelectorConfig {
    key: string;
    value: string;
}
interface LabelSelectorParameters {
    key: string;
    value: string;
    factoryMetadata?: FactoryMetadata;
}
export declare class LabelSelectorFactory implements ComponentFactory<LabelSelectorConfig> {
    private readonly key;
    private readonly value;
    private readonly factoryMetadata;
    constructor({ key, value, factoryMetadata }: LabelSelectorParameters);
    toComponent(): Component<LabelSelectorConfig>;
}
export {};
