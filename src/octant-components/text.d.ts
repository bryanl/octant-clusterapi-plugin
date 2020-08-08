import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface TextConfig {
    value: string;
    isMarkdown?: boolean;
    status?: number;
}
export interface TextOptions {
    isMarkdown?: boolean;
    status?: number;
}
interface TextParameters {
    value: string;
    options?: TextOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class TextFactory implements ComponentFactory<TextConfig> {
    private readonly value;
    private readonly isMarkdown;
    private readonly status;
    private readonly factoryMetadata;
    constructor({ value, options, factoryMetadata }: TextParameters);
    toComponent(): Component<TextConfig>;
}
export {};
