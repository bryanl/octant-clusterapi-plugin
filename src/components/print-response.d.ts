import * as octant from '../octant/plugin';
import { Component } from '../octant-components/component';
export declare class PrintResponse {
    private configSections;
    private statusSections;
    private items;
    addItems(...items: Item[]): void;
    addConfig(summarySection: {
        header: string;
        content: Component<any>;
    }): void;
    addStatus(summarySection: {
        header: string;
        content: Component<any>;
    }): void;
    toObject(): octant.PrintResponse;
}
export declare class Item {
    private width;
    private component;
    constructor(width: number, component: Component<any>);
    toObject(): {
        width?: number;
        view: Component<any>;
    };
}
