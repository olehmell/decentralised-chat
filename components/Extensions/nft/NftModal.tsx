import useModalStore from '@/stores/modal'
import { useState } from 'react'
import { NftExtension } from './NftExtension'
import useExtensionsStore from '@/stores/extensions'
import CancelIcon from '@/assets/icons/cancel.svg'

enum SupportedChains {
  ETHEREUM = 'Ethereum',
  POLYGON = 'Polygon',
  SOLANA = 'Solana',
}

const NftModal = () => {
  const { closeModal } = useModalStore()
  const [chain, setChain] = useState<string>(
    SupportedChains.ETHEREUM.toString()
  )
  const [address, setContractAddress] = useState<string>('')
  const [tokenId, setTokenId] = useState<string>('')

  const { addExtension } = useExtensionsStore()

  const close = () => {
    setContractAddress('')
    setTokenId('')
    closeModal()
  }

  const sendNFTMessage = () => {
    if (address.trim() == '' || tokenId.trim() == '') return

    const nft = new NftExtension({ chain, address, tokenId })
    addExtension(nft)
    close()
  }

  return (
    <div key="nft">
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Choose an NFT</h3>
        <button
          onClick={close}
          className="p-1 rounded-full transition bg-transparent disabled:hover:ring-0 disabled:ring-offset-0 hover:ring-2 focus-visible:!ring-2 focus-visible:outline-none inline-block text-center absolute right-6 m-1 mr-0 text-2xl text-text-muted"
        >
          <CancelIcon />
        </button>
      </div>
      <div className="mt-4">
        <h2>Select a blockchain</h2>
        <select
          onChange={(e) => setChain(e.currentTarget.value)}
          className="select input-bordered w-full mt-1 text-white text-base font-normal focus:outline-indigo-800 focus:outline-offset-0"
        >
          {Object.values(SupportedChains).map((item, index) => (
            <option key={index} value={item} selected={item == chain}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <h2>Contract Address</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Paste smart contract address here"
          className="input input-bordered w-full mt-1 focus:outline-indigo-800 focus:outline-offset-0"
        />
      </div>
      <div className="mt-4">
        <h2>Token Id</h2>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Paste token id here"
          className="input input-bordered w-full mt-1 focus:outline-indigo-800 focus:outline-offset-0"
        />
      </div>

      <div className="modal-action">
        {/* <label onClick={close} className="btn btn-outline btn-secondary">Cancel</label> */}
        <label onClick={sendNFTMessage} className="btn w-full font-normal normal-case hover:bg-indigo-800 hover:border-indigo-800 rounded-3xl">
          Add
        </label>
      </div>
    </div>
  )
}

export default NftModal
