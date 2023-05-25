import Moralis from 'moralis'
import { ExtensionWidget } from '../types'

const chainId: Record<string, number> = {
  ethereum: 1,
  polygon: 137,
}

function getOpenseaLink(options: any): string {
  const { chain, address, tokenId } = options
  let assetChain: string = chain.toLowerCase()
  if (chain == 'Polygon') assetChain = 'matic'

  return `https://opensea.io/assets/${assetChain}/${address}/${tokenId}`
}

export type NftOptions = {
  chain: string
  address: string
  tokenId: string
}

export class NftExtension extends ExtensionWidget<NftOptions> {
  public metadata: any
  public isPreviewReady: boolean = false

  // Extension Name to be used in IPFS storage.
  static extensionName: string = 'NFT'

  constructor(options: NftOptions) {
    super(NftExtension.extensionName, options)
  }

  async init() {
    try {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      })
    } catch (e) {}
  }

  async fetchSolanaNft(tokenId: string): Promise<void> {
    try {
      const response = await Moralis.SolApi.nft.getNFTMetadata({
        address: tokenId,
      })
      const resp = await fetch(response.result.metaplex.metadataUri)
      const data = await resp.json()
      if (data != null) {
        let nftName,
          tokenSymbol = ''
        if (data['collection']) {
          nftName = data['collection']['name']
          tokenSymbol = data['collection']['family']
        } else {
          nftName = data['name']
          nftName = data['symbol']
        }
        this.metadata = { image: data['image'], nftName, tokenSymbol }
      }
    } catch (e) {
      console.log(e)
    }
  }

  async fetchEvmNft(
    address: string,
    chain: number,
    tokenId: string
  ): Promise<void> {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain,
      tokenId,
    })
    this.metadata = JSON.parse(
      JSON.stringify({
        ...response?.result.metadata,
        nftName: response?.result.name,
        tokenSymbol: response?.result.symbol,
      })
    )
  }

  async loadPreview(): Promise<React.ReactNode> {
    try {
      await this.init()

      const schemaChainName = this.schema.options.chain.toLowerCase()

      const address = this.schema.options.address

      let chain = chainId[schemaChainName]

      const tokenId = this.schema.options.tokenId

      // If the chain is Solana, then use Moralis Solana API.
      if (schemaChainName == 'solana') {
        await this.fetchSolanaNft(tokenId)
      } else {
        await this.fetchEvmNft(address, chain, tokenId)
      }
      this.isPreviewReady = true
      return this.render()
    } catch (e) {
      console.log(e)
      return <div>NFT cannot be loaded.</div>
    }
  }

  getImageData(): string {
    const data = this.metadata['image'] ?? ''
    if (data.startsWith('ipfs://')) {
      const ipfsCid = data.split('ipfs://')[1]
      return `https://ipfs.io/ipfs/${ipfsCid}`
    }
    return data
  }

  render(): React.ReactNode {
    if (!this.isPreviewReady || !this.metadata) {
      return (
        <div>
          <b>Loading NFT...</b>
        </div>
      )
    }

    return (
      <div className="mt-4 mb-4">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img alt={this.metadata.nftName} src={this.getImageData()} />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-orange-500">
              {this.metadata.nftName}
            </h2>
            <div className="flex items-center gap-2">
              <p className="">
                #{this.schema.options.tokenId.slice(0, 5)} <br />{' '}
              </p>
              <div className="badge badge-secondary">
                {this.schema.options.chain}
              </div>
            </div>
            <div className="card-actions w-full">
              <a
                target="_blank"
                className="w-full"
                href={getOpenseaLink(this.schema.options)}
              >
                <button className="w-full btn btn-outline border-indigo-600 hover:bg-transparent hover:ring-2 hover:text-white min-h-fit h-auto py-3 normal-case text-base font-normal hover:border-indigo-700 px-5 flex-nowrap rounded-3xl">
                  Open on Opensea
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
