import { ImageExtension } from './image/ImageExtension'
import ImageModal from './image/ImageModal'
import NFTModal from './nft/NFTModal'
import { NFT as NFTExtension, NFTSchema } from './nft/NftExtension'
import { ExtensionEntry } from './types'

const nft: ExtensionEntry = {
  name: "NFT",
  schemaName: NFTExtension.schemaName,
  constructor: (options: any) => new NFTExtension(options),
  modal: <NFTModal />
}

const image: ExtensionEntry = {
  name: "Image",
  schemaName: ImageExtension.schemaName,
  constructor: (options: any) => new ImageExtension(options),
  modal: <ImageModal />
}

export const registry: ExtensionEntry[] = [nft, image]
