import { ExtensionSchema, ExtensionWidget } from "./types";

export interface EmptyExtensionSchema extends ExtensionSchema {
  name: string;
  options: any
}

export class EmptyExtension extends ExtensionWidget {
  public schema: EmptyExtensionSchema;
  public metadata: any;
  public isPreviewReady: boolean = true;

  // Schema Name to be used in IPFS storage.
  static schemaName: string = ""

  constructor(options: any) {
    super();
    this.schema = {
      name: EmptyExtension.schemaName,
      options: options
    }
  }

  async loadPreview(): Promise<React.ReactNode> {
    return this.render()
  }

  render(): React.ReactNode {
    return <></>
  }
}