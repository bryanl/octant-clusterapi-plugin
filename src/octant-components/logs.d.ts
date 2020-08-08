import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface LogsConfig {
    namespace?: string;
    name?: string;
    containers?: string[];
}
export interface LogsOptions {
    namespace?: string;
    name?: string;
    containers?: string[];
}
interface LogsParameters {
    options?: LogsOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class LogsFactory implements ComponentFactory<LogsConfig> {
    private readonly namespace;
    private readonly name;
    private readonly containers;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: LogsParameters);
    toComponent(): Component<LogsConfig>;
}
export {};
