import { Component } from './component';
export interface ComponentFactory<T> {
    toComponent(): Component<T>;
}
