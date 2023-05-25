import {Extension} from "@/components/Extensions/types";
import {NftExtension} from "@/components/Extensions/nft/NftExtension";
import NftModal from "@/components/Extensions/nft/NftModal";
import NFTIcon from "@/assets/extension-icons/nft.svg";

const nft: Extension = {
  name: NftExtension.extensionName,
  initialize: (options: any) => new NftExtension(options),
  label: "Insert NFT",
  modal: <NftModal />,
  icon: <NFTIcon />
}

export default nft;