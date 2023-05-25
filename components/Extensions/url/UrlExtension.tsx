import { ExtensionWidget, ExtensionSchema } from "../types";

type UrlOptions = {
  title: string
  value: string
}

export class UrlExtension extends ExtensionWidget<UrlOptions> {
  public metadata: any;
  public isPreviewReady: boolean = true;

  // Schema Name to be used in IFPS storage.
  static extensionName: string = "URL"

  constructor(options: UrlOptions) {
    super(UrlExtension.extensionName, options)
  }

  async loadPreview(): Promise<React.ReactNode> {

    // Use this method to call APIs, compute schema data, set object state, etc.
    return this.render()
  }

  render(): React.ReactNode {

    // Write code to render the User Interface for the extension inside chat component.
    return <></>
  }
}
