export interface ExtensionSchema {
  name: string;
  options: any;
}

export abstract class ExtensionWidget {
  abstract schema: ExtensionSchema
  abstract render(): React.ReactNode
  abstract isPreviewReady: boolean
  abstract loadPreview(): Promise<React.ReactNode>
}

export interface Extension {
  /** Extension name that is being used in IPFS */
  name: string

  /** A method to construct the Extension class from options data from IPFS. */
  initialize: (options: any) => ExtensionWidget,
  /** Label to show in Extension Selector. */
  label: string

  /** Icon to be used in the Extension Selector. */
  icon?: React.ReactNode

  /** Modal built to take input for the Extension. */
  modal: React.ReactNode
}
