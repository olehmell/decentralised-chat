
import { ExtensionWidget } from "../types";

export type ImageOptions = {
  /** image as string can be IPFS cid, imageURL, or base64. */
  image: string,

  /** Alt text for the image. */
  alt: string
}

export class ImageExtension extends ExtensionWidget<ImageOptions> {

  public isPreviewReady: boolean = true;

  // Schema Name to be used in IFPS storage.
  static extensionName: string = "IMAGE"

  constructor(options: ImageOptions) {
    super(ImageExtension.extensionName, options)
  }

  getImageData(): string {
    const data = this.schema.options.image
    if (data.startsWith("ipfs://")) {
      const ipfsCid = data.split("ipfs://")[1]
      return `https://ipfs.subsocial.network/ipfs/${ipfsCid}`
    }
    return data;
  }

  async loadPreview(): Promise<React.ReactNode> {
    return this.render()
  }

  render(): React.ReactNode {
    return <div key={this.schema.options.image}>
      <div className="card w-96 bg-base-100 shadow-xl mt-4 mb-4">
        <figure><img alt={this.schema.options.alt} src={this.getImageData()} /></figure>
        <div className="card-body p-4">
          {this.schema.options.alt && <p>{this.schema.options.alt}</p>}
          <div className="badge badge-secondary">Image</div>
        </div>
      </div>
    </div>
  }
}