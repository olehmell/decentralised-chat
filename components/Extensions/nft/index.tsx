import {Extension} from "@/components/Extensions/types";
import {ImageExtension} from "@/components/Extensions/image/ImageExtension";
import ImageModal from "@/components/Extensions/image/ImageModal";
import ImageIcon from "@/assets/extension-icons/image.svg";

const image: Extension = {
  name: ImageExtension.extensionName,
  initialize: (options: any) => new ImageExtension(options),
  label: "Image",
  modal: <ImageModal />,
  icon: <ImageIcon />
}

export default image