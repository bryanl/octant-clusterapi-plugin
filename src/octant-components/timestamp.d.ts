import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface TimestampConfig {
    timestamp: number;
}
interface TimestampParameters {
    timestamp: number;
    factoryMetadata?: FactoryMetadata;
}
export declare class TimestampFactory implements ComponentFactory<TimestampConfig> {
    private readonly timestamp;
    private readonly factoryMetadata;
    constructor({ timestamp, factoryMetadata }: TimestampParameters);
    toComponent(): Component<TimestampConfig>;
}
export {};
