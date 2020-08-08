import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface LabelsConfig {
    labels: {
        [key: string]: string;
    };
}
interface LabelsParameters {
    labels: {
        [key: string]: string;
    };
    factoryMetadata?: FactoryMetadata;
}
export declare class LabelsFactory implements ComponentFactory<LabelsConfig> {
    private readonly labels;
    private readonly factoryMetadata;
    constructor({ labels, factoryMetadata }: LabelsParameters);
    toComponent(): Component<LabelsConfig>;
}
export {};
