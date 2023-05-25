import { Extension } from "../types"
import { NftExtension, NftOptions } from "./NftExtension";
import NftModal from "./NftModal";
import NftIcon from "@/assets/extension-icons/nft.svg";

const nft: Extension<NftExtension> = {
  name: NftExtension.extensionName,
  initialize: (options: NftOptions) => new NftExtension(options),
  label: "NFT",
  modal: <NftModal />,
  icon: <NftIcon />
}

export default nft;