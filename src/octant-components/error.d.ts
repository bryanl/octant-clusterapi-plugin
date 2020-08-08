import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface ErrorConfig {
    data?: string;
}
export interface ErrorOptions {
    data?: string;
}
interface ErrorParameters {
    options?: ErrorOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class ErrorFactory implements ComponentFactory<ErrorConfig> {
    private readonly data;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: ErrorParameters);
    toComponent(): Component<ErrorConfig>;
}
export {};
