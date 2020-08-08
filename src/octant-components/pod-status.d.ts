import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface PodStatusConfig {
    pods?: {
        [key: string]: {
            details?: Component<any>[];
            status?: string;
        };
    };
}
export interface PodStatusOptions {
    pods?: {
        [key: string]: {
            details?: Component<any>[];
            status?: string;
        };
    };
}
interface PodStatusParameters {
    options?: PodStatusOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class PodStatusFactory implements ComponentFactory<PodStatusConfig> {
    private readonly pods;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: PodStatusParameters);
    toComponent(): Component<PodStatusConfig>;
}
export {};
