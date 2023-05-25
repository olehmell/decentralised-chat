export interface ExtensionSchema<ExtensionOptions extends any> {
  name: string
  options: ExtensionOptions
}

export abstract class ExtensionWidget<ExtensionOptions extends any> {
  public schema: ExtensionSchema<ExtensionOptions>

  abstract render(): React.ReactNode
  
  abstract isPreviewReady: boolean
  
  abstract loadPreview(): Promise<React.ReactNode>

  constructor(name: string, options: ExtensionOptions) {
    this.schema = {
      name,
      options
    }
  }
}

export abstract class AnyExtensionWidget extends ExtensionWidget<any> {}

export interface Extension<Widget extends ExtensionWidget<any>>  {
  /** Extension name that is being used in IPFS */
  name: string

  /** A method to construct the Extension class from options data from IPFS. */
  initialize: (options: any) => Widget

  /** Label to show in Extension Selector. */
  label: string

  /** Icon to be used in the Extension Selector. */
  icon?: React.ReactNode

  /** Modal built to take input for the Extension. */
  modal: React.ReactNode
}
