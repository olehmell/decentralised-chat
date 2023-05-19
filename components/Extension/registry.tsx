import NFTModal from './nft/NFTModal'
import { NFT as NFTExtension, NFTSchema } from './nft/NftExtension'
import { ExtensionEntry } from './types'

const nft: ExtensionEntry = {
  name: "NFT",
  schemaName: NFTExtension.schemaName,
  constructor: (options: any) => new NFTExtension(options),
  modal: <NFTModal />
}

export const registry: ExtensionEntry[] = [nft]
