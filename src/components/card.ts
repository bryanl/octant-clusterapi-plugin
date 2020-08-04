import { Action, Alert } from '../octant/plugin';
import { Component } from './component';
import { ComponentFactory } from './factory';
import { TextFactory } from './textFactory';

export interface Card {
  body: Component<any>;
  actions?: Action[];
  alert?: Alert;
}

export class CardFactory implements ComponentFactory<Card> {
  constructor(private title: string, private body: Component<any>) {}

  toComponent(): Component<Card> {
    const title = new TextFactory(this.title);

    return {
      metadata: {
        type: 'card',
        title: [title.toComponent()],
      },
      config: {
        body: this.body,
      },
    };
  }
}
