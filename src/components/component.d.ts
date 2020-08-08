export interface Metadata {
    type: string;
    title?: Component<any>[];
    accessor?: string;
}
export interface Component<T> {
    metadata: Metadata;
    config: T;
}
