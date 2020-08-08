import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
import { ButtonGroupConfig } from './button-group';
export interface FlexLayoutConfig {
    sections?: {
        width?: number;
        height?: string;
        margin?: string;
        view?: Component<any>;
    }[][];
    buttonGroup?: Component<ButtonGroupConfig>;
}
export interface FlexLayoutOptions {
    sections?: {
        width?: number;
        height?: string;
        margin?: string;
        view?: Component<any>;
    }[][];
    buttonGroup?: Component<ButtonGroupConfig>;
}
interface FlexLayoutParameters {
    options?: FlexLayoutOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class FlexLayoutFactory implements ComponentFactory<FlexLayoutConfig> {
    private readonly sections;
    private readonly buttonGroup;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: FlexLayoutParameters);
    toComponent(): Component<FlexLayoutConfig>;
}
export {};
