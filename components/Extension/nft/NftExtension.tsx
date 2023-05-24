
import Moralis from "moralis";
import { Extension, IExtension } from "../types";

const chainId: Record<string, number> = {
  'ethereum': 1,
  'polygon': 137
}

function getOpenseaLink(options: any): string {
  const { chain, address, tokenId } = options
  let assetChain: string = chain.toLowerCase()
  if (chain == 'Polygon') assetChain = 'matic'

  return `https://opensea.io/assets/${assetChain}/${address}/${tokenId}`
}

export interface NFTSchema extends Extension {
  type: string;
  options: {
    chain: string;
    address: string;
    tokenId: string;
  };
}

export class NFT extends IExtension {
  public schema: NFTSchema;
  public metadata: any;
  public isPreviewReady: boolean = false;

  // Schema Name to be used in IFPS storage.
  static schemaName: string = "NFT"

  constructor(options: any) {
    super();
    const { chain, address, tokenId } = options;
    this.schema = {
      type: NFT.schemaName,
      options: {
        chain,
        address,
        tokenId
      }
    }
  }


  async loadPreview(): Promise<React.ReactNode> {
    try {
      const address = this.schema.options.address;

      let chain = chainId[this.schema.options.chain.toLowerCase()];

      const tokenId = this.schema.options.tokenId;

      // If the chain is Solana, then use Moralis Solana API.
      if (this.schema.options.chain.toLowerCase() == 'solana') {
        try {
          const response = await Moralis.SolApi.nft.getNFTMetadata({
            address: tokenId
          })
          const resp = await fetch(response.result.metaplex.metadataUri)
          const data = await resp.json()
          if (data != null) {
            let nftName, tokenSymbol = ''
            if (data['collection']) {
              nftName = data['collection']['name']
              tokenSymbol = data['collection']['family']
            } else {
              nftName = data['name']
              nftName = data['symbol']
            }
            this.metadata = { image: data['image'], nftName, tokenSymbol }
          }
        } catch (e) { console.log(e) }
      } else {
        const response = await Moralis.EvmApi.nft.getNFTMetadata({
          address,
          chain,
          tokenId,
        });
        this.metadata = JSON.parse(JSON.stringify({ ...response?.result.metadata, nftName: response?.result.name, tokenSymbol: response?.result.symbol }))
      }
      this.isPreviewReady = true;
      return this.render();
    } catch (e) {
      console.log(e)
      return <div>
        NFT can't be loaded.
      </div>
    }
  }

  getImageData(data: string): string {
    if (data.startsWith("ipfs://")) {
      const ipfsCid = data.split("ipfs://")[1]
      return `https://ipfs.io/ipfs/${ipfsCid}`
    }
    return data;
  }

  render(): React.ReactNode {
    if (!this.isPreviewReady || !this.metadata) {
      return <div>
        <b>Loading NFT...</b>
      </div>
    }

    return <div className="mt-4 mb-4">
      <div className="card md:card-side bg-base-100 shadow-xl">
        <figure className="w-5/12"><img src={this.getImageData(this.metadata['image'] ?? '')} /></figure>
        <div className="card-body p-4 w-7/12">
          <h2 className="card-title text-orange-500">{this.metadata.nftName}</h2>
          <p className="">{this.metadata.tokenSymbol} #{this.schema.options.tokenId.slice(0, 5)} <br /> {this.schema.options.chain}</p>
          <div className="card-actions justify-end">
            <a target="_blank" href={getOpenseaLink(this.schema.options)}>
              <button className="btn btn-primary">Open on Opensea</button>
            </a>
          </div>
        </div>
      </div>
    </div >
  }
}