import { Extension } from './types'
import image from "@/components/Extensions/image";
import nft from "@/components/Extensions/nft";

/** Add the Extension Entry for your extension in this array. */
export const registry: Extension<any>[] = [
  image,
  nft,
]
