import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
import { LinkConfig } from './link';
export interface ResourceViewerConfig {
    edges?: {
        [key: string]: {
            node: string;
            edge: string;
        }[];
    };
    nodes?: {
        [key: string]: {
            name?: string;
            apiVersion?: string;
            kind?: string;
            status?: string;
            details?: Component<any>[];
            path?: Component<LinkConfig>;
        };
    };
    selected?: string;
}
export interface ResourceViewerOptions {
    edges?: {
        [key: string]: {
            node: string;
            edge: string;
        }[];
    };
    nodes?: {
        [key: string]: {
            name?: string;
            apiVersion?: string;
            kind?: string;
            status?: string;
            details?: Component<any>[];
            path?: Component<LinkConfig>;
        };
    };
    selected?: string;
}
interface ResourceViewerParameters {
    options?: ResourceViewerOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class ResourceViewerFactory implements ComponentFactory<ResourceViewerConfig> {
    private readonly edges;
    private readonly nodes;
    private readonly selected;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: ResourceViewerParameters);
    toComponent(): Component<ResourceViewerConfig>;
}
export {};
