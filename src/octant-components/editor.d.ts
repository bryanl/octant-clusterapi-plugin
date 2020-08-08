import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface EditorConfig {
    value: string;
    readOnly: boolean;
    metadata: {
        [key: string]: string;
    };
    submitAction: string;
    submitLabel: string;
}
interface EditorParameters {
    value: string;
    readOnly: boolean;
    metadata: {
        [key: string]: string;
    };
    submitAction: string;
    submitLabel: string;
    factoryMetadata?: FactoryMetadata;
}
export declare class EditorFactory implements ComponentFactory<EditorConfig> {
    private readonly value;
    private readonly readOnly;
    private readonly metadata;
    private readonly submitAction;
    private readonly submitLabel;
    private readonly factoryMetadata;
    constructor({ value, readOnly, metadata, submitAction, submitLabel, factoryMetadata, }: EditorParameters);
    toComponent(): Component<EditorConfig>;
}
export {};
