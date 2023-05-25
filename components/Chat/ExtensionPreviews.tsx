import { useEffect, useState } from 'react'
import { AnyExtensionWidget } from '../Extensions/types'
import CancelIcon from '@/assets/icons/cancel.svg';

type ExtensionPreviewsProps = {
  extensions: AnyExtensionWidget[]

  // onClear property is passed when the previews are for a new message.
  onClear?: () => void
}

const ExtensionPreviews = (props: ExtensionPreviewsProps) => {
  const { extensions, onClear } = props
  const [previews, setPreviews] = useState<React.ReactNode[]>()

  useEffect(() => {
    const promises: Promise<React.ReactNode>[] = extensions.map((item) =>
      item.loadPreview()
    )
    Promise.all(promises).then((data) => setPreviews(data))
  }, [extensions.length])

  if (!previews || previews.length == 0) return <></>

  if (onClear != undefined) {
    const clear = () => {
      setPreviews([])
      onClear()
    }

    return (
      <div className="p-4 w-full bg-slate-800 rounded-box mb-2">
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="card-title text-white">Extension preview</h1>
          <button
            onClick={clear}
            className="p-1 rounded-full transition bg-transparent disabled:hover:ring-0 disabled:ring-offset-0 hover:ring-2 focus-visible:!ring-2 focus-visible:outline-none inline-block text-center absolute right-6 m-1 mr-0 text-2xl text-text-muted"
          >
            <CancelIcon />
          </button>
        </div>
        <div className="carousel carousel-center space-x-4 w-full">
          {previews?.map((n, i) => (
            <div key={i} className="carousel-item w-2/3">{n}</div>
          ))}
        </div>
      </div>
    )
  }

  return <>{previews}</>
}

export default ExtensionPreviews
