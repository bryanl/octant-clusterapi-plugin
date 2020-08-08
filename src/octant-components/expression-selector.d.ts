import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface ExpressionSelectorConfig {
    key: string;
    operator: string;
    values: string[];
}
interface ExpressionSelectorParameters {
    key: string;
    operator: string;
    values: string[];
    factoryMetadata?: FactoryMetadata;
}
export declare class ExpressionSelectorFactory implements ComponentFactory<ExpressionSelectorConfig> {
    private readonly key;
    private readonly operator;
    private readonly values;
    private readonly factoryMetadata;
    constructor({ key, operator, values, factoryMetadata, }: ExpressionSelectorParameters);
    toComponent(): Component<ExpressionSelectorConfig>;
}
export {};
