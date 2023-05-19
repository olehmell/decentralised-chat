import useModalStore from "@/stores/modal"
import { useState } from "react"
import useExtensionsStore from "@/stores/extensions"
import { ImageExtension } from './ImageExtension'
import { FileUploader } from "react-drag-drop-files";
import { getSubsocialApi } from "@/services/subsocial/api";

const fileTypes = ["JPG", "PNG", "GIF"]
enum ImageOption {
  URL,
  UPLOAD
}

const ImageModal = () => {
  const { closeModal } = useModalStore()

  const [file, setFile] = useState<File>()
  const [imageOption, setImageOption] = useState<ImageOption>(ImageOption.UPLOAD)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [altText, setAltText] = useState<string>('')

  const { addExtension } = useExtensionsStore()

  const close = () => {
    setFile(undefined)
    setImageUrl('')
    setAltText('')
    closeModal()
  }

  const sendImage = async () => {
    if (imageUrl.trim() == '' && file == undefined) return;

    if (imageOption == ImageOption.URL) {
      const image = new ImageExtension({ image: imageUrl, alt: altText })
      addExtension(image)
      close()
      return;
    }

    // In case of File, upload it on IPFS & put cid in the schema.
    if (file) {
      const api = await getSubsocialApi();
      const cid = await api.ipfs.saveFile(file)
      const image = new ImageExtension({ image: `ipfs://${cid}`, alt: altText })
      addExtension(image)
      close()
    }
  }

  const changeOption = (e: any) => {
    setFile(undefined)
    setImageUrl('')
    setImageOption(parseInt(e.currentTarget.value))
  }

  return <div key="nft">
    <h3 className="font-bold text-lg">Pick an Image</h3>
    <div className="mt-4">
      <h2>Select the source:</h2>
      <select onChange={(e) => changeOption(e)} className="select select-primary w-full max-w-xs mt-1">
        <option key={ImageOption.UPLOAD} value={ImageOption.UPLOAD} selected={imageOption == ImageOption.UPLOAD}>Upload Image</option>
        <option key={ImageOption.URL} value={ImageOption.URL} selected={imageOption == ImageOption.URL}>URL</option>
      </select>
    </div>

    {imageOption == ImageOption.UPLOAD ? <div className="mt-4">
      <FileUploader
        handleChange={(d: File) => setFile(d)}
        name="image"
        types={fileTypes}
      />
    </div> :
      <div className="mt-4">
        <h2>Enter Image URL:</h2>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste the URL here" className="input input-bordered w-full max-w-xs mt-1" />
      </div>}


    <div className="mt-4">
      <h2>Alt Text</h2>
      <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Any ALT text here" className="input input-bordered w-full max-w-xs mt-1" />
    </div>
    <div className="modal-action">
      <label onClick={close} className="btn btn-outline btn-secondary">Cancel</label>
      <label onClick={sendImage} className="btn">Add</label>
    </div>
  </div>
}

export default ImageModal
