import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface SummaryConfig {
    sections: {
        header: string;
        content: Component<any>;
    }[];
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
export interface SummaryOptions {
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
interface SummaryParameters {
    sections: {
        header: string;
        content: Component<any>;
    }[];
    options?: SummaryOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class SummaryFactory implements ComponentFactory<SummaryConfig> {
    private readonly sections;
    private readonly actions;
    private readonly alert;
    private readonly factoryMetadata;
    constructor({ sections, options, factoryMetadata }: SummaryParameters);
    toComponent(): Component<SummaryConfig>;
}
export {};
