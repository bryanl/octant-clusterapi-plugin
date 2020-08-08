import { ComponentFactory } from './factory';
import { Component } from './component';
export interface TableColumn {
    name: string;
    accessor: string;
}
export declare const createColumn: (name: string, options?: {
    accessor?: string | undefined;
} | undefined) => TableColumn;
export interface TableRow {
    [key: string]: Component<any>;
}
interface TableFilter {
    values: string[];
    selected: string[];
}
interface TableFilters {
    [key: string]: TableFilter;
}
export interface Table {
    columns: TableColumn[];
    rows: TableRow[];
    emptyContent: string;
    loading: boolean;
    filters: TableFilters;
}
export declare class TableFactory implements ComponentFactory<Table> {
    private title;
    private columns;
    private rows;
    constructor(title: ComponentFactory<any>[], columns: TableColumn[], rows: TableRow[]);
    toComponent(): Component<Table>;
}
export {};
