import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface QuadrantConfig {
    nw?: {
        value?: string;
        label?: string;
    };
    ne?: {
        value?: string;
        label?: string;
    };
    se?: {
        value?: string;
        label?: string;
    };
    sw?: {
        value?: string;
        label?: string;
    };
}
export interface QuadrantOptions {
    nw?: {
        value?: string;
        label?: string;
    };
    ne?: {
        value?: string;
        label?: string;
    };
    se?: {
        value?: string;
        label?: string;
    };
    sw?: {
        value?: string;
        label?: string;
    };
}
interface QuadrantParameters {
    options?: QuadrantOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class QuadrantFactory implements ComponentFactory<QuadrantConfig> {
    private readonly nw;
    private readonly ne;
    private readonly se;
    private readonly sw;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: QuadrantParameters);
    toComponent(): Component<QuadrantConfig>;
}
export {};
