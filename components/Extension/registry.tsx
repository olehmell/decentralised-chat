import { ImageExtension } from './image/ImageExtension'
import ImageModal from './image/ImageModal'
import NFTModal from './nft/NFTModal'
import { NFT as NFTExtension, NFTSchema } from './nft/NftExtension'
import { ExtensionEntry } from './types'
import ImageIcon from '@/assets/extension-icons/image.svg'
import NFTIcon from '@/assets/extension-icons/nft.svg'

const nft: ExtensionEntry = {
  name: "NFT",
  schemaName: NFTExtension.schemaName,
  constructor: (options: any) => new NFTExtension(options),
  modal: <NFTModal />,
  icon: <NFTIcon />
}

const image: ExtensionEntry = {
  name: "Image",
  schemaName: ImageExtension.schemaName,
  constructor: (options: any) => new ImageExtension(options),
  modal: <ImageModal />,
  icon: <ImageIcon />
}

export const registry: ExtensionEntry[] = [nft, image]
