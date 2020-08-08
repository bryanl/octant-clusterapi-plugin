import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface AnnotationsConfig {
    annotations: {
        [key: string]: string;
    };
}
interface AnnotationsParameters {
    annotations: {
        [key: string]: string;
    };
    factoryMetadata?: FactoryMetadata;
}
export declare class AnnotationsFactory implements ComponentFactory<AnnotationsConfig> {
    private readonly annotations;
    private readonly factoryMetadata;
    constructor({ annotations, factoryMetadata }: AnnotationsParameters);
    toComponent(): Component<AnnotationsConfig>;
}
export {};
