import { Component } from './component';
/**
 * ComponentFactory is a generic factory for creating a component of type T.
 */
export interface ComponentFactory<T> {
    toComponent(): Component<T>;
}
/**
 * FactoryMetadata allows for configuring the metadata a factory generates.
 */
export interface FactoryMetadata {
    /**
     * sets the component's title
     */
    title?: Component<any>[];
    /**
     * set the accessor for the component
     */
    accessor?: string;
}
