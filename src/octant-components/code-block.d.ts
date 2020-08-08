import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface CodeConfig {
    value: string;
}
interface CodeParameters {
    value: string;
    factoryMetadata?: FactoryMetadata;
}
export declare class CodeFactory implements ComponentFactory<CodeConfig> {
    private readonly value;
    private readonly factoryMetadata;
    constructor({ value, factoryMetadata }: CodeParameters);
    toComponent(): Component<CodeConfig>;
}
export {};
