/**
 * Metadata contains component metadata.
 */
export interface Metadata {
    /**
     * type is the type of component.
     */
    type: string;
    title?: Component<any>[];
    accessor?: string;
}
/**
 * Component is a generic component.
 */
export interface Component<T> {
    metadata: Metadata;
    config: T;
}
