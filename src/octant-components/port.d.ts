import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
import { ButtonGroupConfig } from './button-group';
export interface PortConfig {
    port?: number;
    protocol?: string;
    targetPort?: number;
    targetPortName?: string;
    state?: {
        isForwardable?: boolean;
        isForwarded?: boolean;
        port?: number;
        id?: string;
    };
    buttonGroup?: Component<ButtonGroupConfig>;
}
export interface PortOptions {
    port?: number;
    protocol?: string;
    targetPort?: number;
    targetPortName?: string;
    state?: {
        isForwardable?: boolean;
        isForwarded?: boolean;
        port?: number;
        id?: string;
    };
    buttonGroup?: Component<ButtonGroupConfig>;
}
interface PortParameters {
    options?: PortOptions;
    factoryMetadata?: FactoryMetadata;
}
export declare class PortFactory implements ComponentFactory<PortConfig> {
    private readonly port;
    private readonly protocol;
    private readonly targetPort;
    private readonly targetPortName;
    private readonly state;
    private readonly buttonGroup;
    private readonly factoryMetadata;
    constructor({ options, factoryMetadata }: PortParameters);
    toComponent(): Component<PortConfig>;
}
export {};
