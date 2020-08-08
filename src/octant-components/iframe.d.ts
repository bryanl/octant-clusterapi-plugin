import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface IFrameConfig {
    url: string;
    title: string;
}
interface IFrameParameters {
    url: string;
    title: string;
    factoryMetadata?: FactoryMetadata;
}
export declare class IFrameFactory implements ComponentFactory<IFrameConfig> {
    private readonly url;
    private readonly title;
    private readonly factoryMetadata;
    constructor({ url, title, factoryMetadata }: IFrameParameters);
    toComponent(): Component<IFrameConfig>;
}
export {};
