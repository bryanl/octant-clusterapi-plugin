import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
export interface TerminalConfig {
    namespace: string;
    name: string;
    podName: string;
    containers: string[];
    terminal: {
        container: string;
        command: string;
        createdAt: number;
        active: boolean;
    };
}
interface TerminalParameters {
    namespace: string;
    name: string;
    podName: string;
    containers: string[];
    terminal: {
        container: string;
        command: string;
        createdAt: number;
        active: boolean;
    };
    factoryMetadata?: FactoryMetadata;
}
export declare class TerminalFactory implements ComponentFactory<TerminalConfig> {
    private readonly namespace;
    private readonly name;
    private readonly podName;
    private readonly containers;
    private readonly terminal;
    private readonly factoryMetadata;
    constructor({ namespace, name, podName, containers, terminal, factoryMetadata, }: TerminalParameters);
    toComponent(): Component<TerminalConfig>;
}
export {};
