
import { Extension, IExtension } from "../types";


export interface ImageExtensionSchema extends Extension {
  type: string;
  options: {
    // image as string can be IPFS cid, imageURL, or base64.
    image: string,

    // Alt text for the image.
    alt: string
  }
}

export class ImageExtension extends IExtension {
  public schema: ImageExtensionSchema;
  public metadata: any;
  public isPreviewReady: boolean = true;

  // Schema Name to be used in IFPS storage.
  static schemaName: string = ""

  constructor(options: any) {
    super();
    const { image, alt } = options;

    this.schema = {
      type: ImageExtension.schemaName,
      options: {
        image,
        alt
      }
    }
  }

  getImageData(data: string): string {
    if (data.startsWith("ipfs://")) {
      const ipfsCid = data.split("ipfs://")[1]
      return `https://ipfs.io/ipfs/${ipfsCid}`
    }
    return data;
  }


  async loadPreview(): Promise<React.ReactNode> {
    return this.render()
  }

  render(): React.ReactNode {
    return <div key={this.schema.options.image}>
      <div className="card w-96 bg-base-100 shadow-xl mt-4 mb-4">
        <figure><img alt={this.schema.options.alt} src={this.getImageData(this.schema.options.image)} /></figure>
        <div className="card-body p-4">
          {this.schema.options.alt && <p>{this.schema.options.alt}</p>}
          <div className="badge badge-secondary">IMAGE</div>
        </div>
      </div>
    </div>
  }
}