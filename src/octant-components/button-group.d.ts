import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface ButtonGroupConfig {
    buttons: {
        name: string;
        payload: {
            [key: string]: any;
        };
        confirmation?: {
            title: string;
            body: string;
        };
    }[];
}
interface ButtonGroupParameters {
    buttons: {
        name: string;
        payload: {
            [key: string]: any;
        };
        confirmation?: {
            title: string;
            body: string;
        };
    }[];
    factoryMetadata?: FactoryMetadata;
}
export declare class ButtonGroupFactory implements ComponentFactory<ButtonGroupConfig> {
    private readonly buttons;
    private readonly factoryMetadata;
    constructor({ buttons, factoryMetadata }: ButtonGroupParameters);
    toComponent(): Component<ButtonGroupConfig>;
}
export {};
