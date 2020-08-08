import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface CardConfig {
    body: Component<any>;
    actions?: {
        name: string;
        title: string;
        form: {
            fields: any[];
        };
        modal: boolean;
    }[];
    alert?: {
        type: string;
        message: string;
    };
}
export interface CardOptions {
    actions?: {
        name: string;
        title: string;
        form: {
            fields: any[];
        };
        modal: boolean;
    }[];
    alert?: {
        type: string;
        message: string;
    };
}
interface CardParameters {
    body: Component<any>;
    options?: CardOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class CardFactory implements ComponentFactory<CardConfig> {
    private readonly body;
    private readonly actions;
    private readonly alert;
    private readonly factoryMetadata;
    constructor({ body, options, factoryMetadata }: CardParameters);
    toComponent(): Component<CardConfig>;
}
export {};
