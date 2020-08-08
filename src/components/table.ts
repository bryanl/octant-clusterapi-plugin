import { ComponentFactory } from './factory';
import { Component } from './component';

export interface TableColumn {
  name: string;
  accessor: string;
}

export const createColumn = (
  name: string,
  options?: { accessor?: string }
): TableColumn => {
  if (options && options.accessor) {
    return { name, accessor: options.accessor };
  }
  return { name, accessor: name };
};

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

export class TableFactory implements ComponentFactory<Table> {
  constructor(
    private title: ComponentFactory<any>[],
    private columns: TableColumn[],
    private rows: TableRow[]
  ) {}

  toComponent(): Component<Table> {
    return {
      metadata: {
        type: 'table',
        title: this.title.map(t => t.toComponent()),
      },
      config: {
        columns: this.columns,
        rows: this.rows,
        // columns: [
        //   { accessor: 'foo', name: 'foo' },
        //   { accessor: 'foo', name: 'bar' },
        // ],
        // rows: [
        //   {
        //     foo: new TextFactory('Foo').toComponent(),
        //     bar: new TextFactory('Bar').toComponent(),
        //   },
        // ],
        emptyContent: 'the table is empty',
        loading: false,
        filters: {},
      },
    };
  }
}
