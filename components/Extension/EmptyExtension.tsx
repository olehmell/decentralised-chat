
import Moralis from "moralis";
import { Extension, IExtension } from "./types";


export interface EmptyExtensionSchema extends Extension {
  type: string;
  options: {}
}

export class EmptyExtension extends IExtension {
  public schema: EmptyExtensionSchema;
  public metadata: any;
  public isPreviewReady: boolean = true;

  // Schema Name to be used in IFPS storage.
  static schemaName: string = ""

  constructor() {
    super();
    this.schema = {
      type: EmptyExtension.schemaName,
      options: {}
    }
  }


  async loadPreview(): Promise<React.ReactNode> {
    return this.render()
  }

  render(): React.ReactNode {
    return <></>
  }
}