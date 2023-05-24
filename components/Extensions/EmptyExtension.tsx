import { Extension, IExtension } from "./types";


export interface EmptyExtensionSchema extends Extension {
  type: string;
  options: any
}

export class EmptyExtension extends IExtension {
  public schema: EmptyExtensionSchema;
  public metadata: any;
  public isPreviewReady: boolean = true;

  // Schema Name to be used in IFPS storage.
  static schemaName: string = ""

  constructor(options: any) {
    super();
    this.schema = {
      type: EmptyExtension.schemaName,
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