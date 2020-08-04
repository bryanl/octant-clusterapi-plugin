import { ComponentFactory } from './factory';
import * as octant from '../octant/plugin';

export const createContentResponse = (
  title: ComponentFactory<any>[],
  bodyComponents: ComponentFactory<any>[]
): octant.ContentResponse => {
  return {
    content: {
      title: title.map(t => t.toComponent()),
      viewComponents: bodyComponents.map(c => c.toComponent()),
    },
  };
};
