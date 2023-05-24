import useModalStore from "@/stores/modal"
import { useState } from "react"
import { NFT } from "./NftExtension"
import useExtensionsStore from "@/stores/extensions"

enum SupportedChains { ETHEREUM = 'Ethereum', POLYGON = 'Polygon', SOLANA = 'Solana' }

const NFTModal = () => {
  const { closeModal } = useModalStore()
  const [chain, setChain] = useState<string>(SupportedChains.ETHEREUM.toString())
  const [address, setContractAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')

  const { addExtension } = useExtensionsStore()

  const close = () => {
    setContractAddress('')
    setTokenId('')
    closeModal()
  }

  const sendNFTMessage = () => {
    if (address.trim() == '' || tokenId.trim() == '') return;

    const nft = new NFT({ chain, address, tokenId })
    addExtension(nft)
    close()
  }

  return <div key="nft">
    <h3 className="font-bold text-lg">Choose an NFT</h3>
    <div className="mt-4">
      <h2>Select a blockchain</h2>
      <select onChange={(e) => setChain(e.currentTarget.value)} className="select select-primary w-full max-w-xs mt-1">
        {Object.values(SupportedChains).map((item, index) => <option key={index} value={item} selected={item == chain}>{item}</option>)}
      </select>
    </div>
    <div className="mt-4">
      <h2>Contract Address</h2>
      <input type="text" value={address} onChange={(e) => setContractAddress(e.target.value)} placeholder="Paste smart contract address here" className="input input-bordered w-full max-w-xs mt-1" />
    </div>
    <div className="mt-4">
      <h2>Token Id</h2>
      <input type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Paste token id here" className="input input-bordered w-full max-w-xs mt-1" />
    </div>


    <div className="modal-action">
      <label onClick={close} className="btn btn-outline btn-secondary">Cancel</label>
      <label onClick={sendNFTMessage} className="btn">Add</label>
    </div>
  </div>
}

export default NFTModal
