import * as octant from '../octant/plugin';
import { Component } from '../octant-components/component';

export class PrintResponse {
  private configSections: { header: string; content: Component<any> }[] = [];
  private statusSections: { header: string; content: Component<any> }[] = [];
  private items: Item[] = [];

  addItems(...items: Item[]) {
    this.items = items;
  }

  addConfig(summarySection: { header: string; content: Component<any> }) {
    this.configSections.push(summarySection);
  }

  addStatus(summarySection: { header: string; content: Component<any> }) {
    this.statusSections.push(summarySection);
  }

  toObject(): octant.PrintResponse {
    return {
      config: this.configSections,
      status: this.statusSections,
      items: this.items.map(item => item.toObject()),
    };
  }
}

export class Item {
  constructor(private width: number, private component: Component<any>) {}

  toObject(): { width?: number; view: Component<any> } {
    return {
      width: this.width,
      view: this.component,
    };
  }
}
