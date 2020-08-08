import * as octant from "./plugin";
export declare enum Width {
    Half = 12,
    Full = 24
}
export declare function createText(value: string, isMarkdown?: boolean): octant.TextView;
export declare function createLink(value: string, ref: string): octant.LinkView;
export declare function createGridAction(name: string, actionPath: string, payload: {
    [key: string]: string;
}, confirmation?: octant.Confirmation, type?: string): octant.GridAction;
export declare class Navigation implements octant.Navigation {
    title: string;
    path: string;
    iconName?: string;
    children: octant.Navigation[];
    constructor(title: string, path: string, icon?: string);
    add(title: string, path: string, icon?: string): void;
}
export declare class FlexLayout implements octant.FlexLayoutView {
    config: {
        sections: octant.FlexLayoutItem[][];
        buttonGroup?: octant.ButtonGroupView;
    };
    metadata: {
        type: string;
        accessor: string;
        title: octant.View[];
    };
    constructor(title: string);
    addSection(items: octant.FlexLayoutItem[]): void;
}
export declare class Table implements octant.TableView {
    metadata: {
        type: string;
        title: octant.View[];
    };
    config: {
        columns: octant.TableColumn[];
        rows: octant.TableRow[];
        emptyContent: string;
        loading: boolean;
        filters: octant.TableFilters;
    };
    constructor(title: octant.View[], columns?: octant.TableColumn[], rows?: octant.TableRow[], emptyMsg?: string);
    addRow(row: octant.TableRow, gridActions?: octant.GridAction[]): void;
}
