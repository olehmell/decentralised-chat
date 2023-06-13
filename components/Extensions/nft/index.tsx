import { Extension } from "../types"
import { NftExtension, NftProperties } from "./NftExtension";
import NftModal from "./NftModal";
import NftIcon from "@/assets/extension-icons/nft.svg";

const nft: Extension<NftExtension> = {
  name: NftExtension.id,
  initialize: (properties: NftProperties) => new NftExtension(properties),
  label: "NFT",
  modal: <NftModal />,
  icon: <NftIcon />
}

export default nft;