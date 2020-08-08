import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface TableConfig {
    columns: {
        name: string;
        accessor: string;
    }[];
    rows: {
        [key: string]: Component<any>;
    }[];
    emptyContent: string;
    loading: boolean;
    filters: {
        [key: string]: {
            values: string[];
            selected: string[];
        };
    };
}
interface TableParameters {
    columns: {
        name: string;
        accessor: string;
    }[];
    rows: {
        [key: string]: Component<any>;
    }[];
    emptyContent: string;
    loading: boolean;
    filters: {
        [key: string]: {
            values: string[];
            selected: string[];
        };
    };
    factoryMetadata?: FactoryMetadata;
}
export declare class TableFactory implements ComponentFactory<TableConfig> {
    private readonly columns;
    private readonly rows;
    private readonly emptyContent;
    private readonly loading;
    private readonly filters;
    private readonly factoryMetadata;
    constructor({ columns, rows, emptyContent, loading, filters, factoryMetadata, }: TableParameters);
    toComponent(): Component<TableConfig>;
}
export {};
