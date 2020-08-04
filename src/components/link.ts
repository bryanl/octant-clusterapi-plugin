import { ComponentFactory } from './factory';
import { Component } from './component';

export interface Link {
  value: string;
  ref: string;
  status?: number;
  statusDetail?: Component<any>;
}

export interface LinkOptions {
  status?: number;
  statusDetail?: ComponentFactory<any>;
}

export class LinkFactory implements ComponentFactory<Link> {
  private readonly statusDetail: ComponentFactory<any> | undefined;
  private readonly status: number | undefined;

  constructor(
    private value: string,
    private ref: string,
    options?: LinkOptions
  ) {
    if (options) {
      this.status = options.status;
      this.statusDetail = options.statusDetail;
    }
  }

  toComponent(): Component<Link> {
    return {
      metadata: {
        type: 'link',
      },
      config: {
        value: this.value,
        ref: this.ref,

        ...(this.status && { status: this.status }),
        ...(this.statusDetail && {
          statusDetail: this.statusDetail.toComponent(),
        }),
      },
    };
  }
}
