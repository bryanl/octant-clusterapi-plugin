import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';
import { CardConfig } from './card';
export interface CardListConfig {
    cards: Component<CardConfig>[];
}
interface CardListParameters {
    cards: Component<CardConfig>[];
    factoryMetadata?: FactoryMetadata;
}
export declare class CardListFactory implements ComponentFactory<CardListConfig> {
    private readonly cards;
    private readonly factoryMetadata;
    constructor({ cards, factoryMetadata }: CardListParameters);
    toComponent(): Component<CardListConfig>;
}
export {};
