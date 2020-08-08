import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface ContainersConfig {
    containers: {
        name: string;
        image: string;
    }[];
}
interface ContainersParameters {
    containers: {
        name: string;
        image: string;
    }[];
    factoryMetadata?: FactoryMetadata;
}
export declare class ContainersFactory implements ComponentFactory<ContainersConfig> {
    private readonly containers;
    private readonly factoryMetadata;
    constructor({ containers, factoryMetadata }: ContainersParameters);
    toComponent(): Component<ContainersConfig>;
}
export {};
