import { useEffect, useState } from "react"
import { IExtension } from "../Extension/types"

type ExtensionPreviewsProps = {
  extensions: IExtension[]

  // onClear property is passed when the previews are for a new message.
  onClear?: () => void
}

const ExtensionPreviews = (props: ExtensionPreviewsProps) => {
  const { extensions, onClear } = props
  const [previews, setPreviews] = useState<React.ReactNode[]>()

  useEffect(() => {
    const promises: Promise<React.ReactNode>[] = extensions.map((item) => item.loadPreview())
    Promise.all(promises).then((data) => setPreviews(data))
  }, [extensions.length])

  if(!previews || previews.length == 0) return <></>

  if (onClear != undefined) {

    const clear = () => {
      setPreviews([])
      onClear()
    }

    return (
      <div className='p-4 w-full bg-neutral rounded-box mb-2'>
        <div className='flex w-full flex-row items-center justify-between'>
          <h1 className='card-title text-orange-500'>New message</h1>
          <div onClick={clear} className='btn btn-round'>Clear</div>
        </div>
        <div className="carousel carousel-center space-x-4 w-full">
          {previews?.map(i => <div className="carousel-item w-2/3">
            {i}
          </div>)}
        </div>
      </div>
    )
  }

  return <>{previews}</>
}

export default ExtensionPreviews
