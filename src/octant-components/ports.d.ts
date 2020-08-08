import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
import { PortConfig } from './port';
export interface PortsConfig {
    ports?: Component<PortConfig>[];
}
export interface PortsOptions {
    ports?: Component<PortConfig>[];
}
interface PortsParameters {
    options?: PortsOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class PortsFactory implements ComponentFactory<PortsConfig> {
    private readonly ports;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: PortsParameters);
    toComponent(): Component<PortsConfig>;
}
export {};
