import { ComponentFactory } from './factory';
import { Component } from './component';

export interface Text {
  value: string;
  isMarkdown?: boolean;
  status?: number;
}

export interface TextOptions {
  isMarkdown?: boolean;
  status?: number;
}

export class TextFactory implements ComponentFactory<Text> {
  private readonly status: number | undefined;
  private readonly isMarkdown: boolean | undefined;

  constructor(private value: string, options?: TextOptions) {
    if (options) {
      this.isMarkdown = options.isMarkdown;
      this.status = options.status;
    }
  }

  toComponent(): Component<Text> {
    return {
      metadata: {
        type: 'text',
      },
      config: {
        value: this.value,
        ...(this.isMarkdown && { isMarkdown: this.isMarkdown }),
        ...(this.status && { status: this.status }),
      },
    };
  }
}
