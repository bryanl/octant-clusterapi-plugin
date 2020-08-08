import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface GridActionsConfig {
    actions: {
        name: string;
        actionPath: string;
        payload: {
            [key: string]: any;
        };
        confirmation?: {
            title: string;
            body: string;
        };
        type: string;
    }[];
}
interface GridActionsParameters {
    actions: {
        name: string;
        actionPath: string;
        payload: {
            [key: string]: any;
        };
        confirmation?: {
            title: string;
            body: string;
        };
        type: string;
    }[];
    factoryMetadata?: FactoryMetadata;
}
export declare class GridActionsFactory implements ComponentFactory<GridActionsConfig> {
    private readonly actions;
    private readonly factoryMetadata;
    constructor({ actions, factoryMetadata }: GridActionsParameters);
    toComponent(): Component<GridActionsConfig>;
}
export {};
