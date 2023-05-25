import { Extension } from "../types"
import { ImageExtension } from "./ImageExtension"
import ImageModal from "./ImageModal"
import ImageIcon from "@/assets/extension-icons/image.svg";

const image: Extension<ImageExtension> = {
  name: ImageExtension.extensionName,
  initialize: (options: any) => new ImageExtension(options),
  label: "Image",
  modal: <ImageModal />,
  icon: <ImageIcon />
}

export default image