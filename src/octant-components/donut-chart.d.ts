import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface DonutChartConfig {
    segments: {
        count: number;
        status: string;
    }[];
    labels: {
        plural: string;
        singular: string;
    };
    size: number;
}
interface DonutChartParameters {
    segments: {
        count: number;
        status: string;
    }[];
    labels: {
        plural: string;
        singular: string;
    };
    size: number;
    factoryMetadata?: FactoryMetadata;
}
export declare class DonutChartFactory implements ComponentFactory<DonutChartConfig> {
    private readonly segments;
    private readonly labels;
    private readonly size;
    private readonly factoryMetadata;
    constructor({ segments, labels, size, factoryMetadata, }: DonutChartParameters);
    toComponent(): Component<DonutChartConfig>;
}
export {};
