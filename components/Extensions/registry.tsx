import { ImageExtensionSchema } from './image/ImageExtension'
import { NFTSchema } from './nft/NftExtension'
import { Extension } from './types'
import nft from "@/components/Extensions/nft";
import image from "@/components/Extensions/image";

/** Append your Extension Schema in this type. */
export type ExtensionSchemas =
  | NFTSchema
  | ImageExtensionSchema

/** Add the Extension Entry for your extension in this array. */
export const registry: Extension[] = [
  nft,
  image
]
