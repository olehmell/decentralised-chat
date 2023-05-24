export interface Extension {
  type: string;
  options: any;
}

export abstract class IExtension {
  abstract schema: Extension
  abstract render(): React.ReactNode
  abstract isPreviewReady: boolean
  abstract loadPreview(): Promise<React.ReactNode>
}

export interface ExtensionEntry {
  // Name to show in Extension Selector.
  name: string

  // Name of the schema that is being used in IPFS.
  schemaName: string

  // A method to construct the Extension class from options data from IPFS.
  constructor: (options: any) => IExtension,

  // Icon to be used in the Extension Selector.
  icon?: React.ReactNode

  // Modal built to take input for the Extension.
  modal: React.ReactNode
}
