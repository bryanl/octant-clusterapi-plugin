import { ComponentFactory } from './factory';
import * as octant from '../octant/plugin';
import { FlexLayoutItem } from '../octant/plugin';
import { SummarySection } from './summary-section';

export class PrintResponse {
  private configSections: SummarySection[] = [];
  private configStatuses: SummarySection[] = [];
  private items: Item[] = [];

  addItems(...items: Item[]) {
    this.items = items;
  }

  addConfig(summarySection: SummarySection) {
    this.configSections.push(summarySection);
  }

  addigStatus(summarySection: SummarySection) {
    this.configStatuses.push(summarySection);
  }

  toObject(): octant.PrintResponse {
    return {
      config: this.configSections.map(c => c.toObject()),
      status: this.configStatuses.map(c => c.toObject()),
      items: this.items.map(item => item.toObject()),
    };
  }
}

export class Item {
  constructor(
    private width: number,
    private component: ComponentFactory<any>
  ) {}

  toObject(): FlexLayoutItem {
    return {
      width: this.width,
      view: this.component.toComponent(),
    };
  }
}
