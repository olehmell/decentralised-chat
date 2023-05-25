import { ImageExtension } from './image/ImageExtension'
import { Extension } from './types'
import nft from "@/components/Extensions/nft";
import image from "@/components/Extensions/image";

/** Add the Extension Entry for your extension in this array. */
export const registry: Extension<any>[] = [
  image,
  nft
]
