import { ComponentFactory } from './factory';
import * as octant from '../octant/plugin';

export class SummarySection {
  constructor(private header: string, private content: ComponentFactory<any>) {}

  toObject(): octant.SummaryItem {
    return {
      header: this.header,
      content: this.content.toComponent(),
    };
  }
}
