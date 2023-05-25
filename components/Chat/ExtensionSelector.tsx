import Attach from '@/assets/icons/attach.svg'
import { registry } from '../Extensions/registry'
import useModalStore from '@/stores/modal'

const ExtensionSelector = () => {
  const { openModal } = useModalStore()

  return (
    <div className="dropdown dropdown-top dropdown-hover">
      <div className="relative px-6">
        <label className="p-1 rounded-full transition bg-transparent disabled:hover:ring-0 disabled:ring-offset-0 hover:ring-2 focus-visible:!ring-2 focus-visible:outline-none inline-block text-center absolute top-2 right-3 m-1 mr-0 text-2xl text-text-muted">
          <Attach fill="#fff" className="h-4 w-4" />
        </label>
      </div>
      <ul className="dropdown-content menu -left-10 p-2 top-3 rounded-lg bg-slate-800 shadow-[0_5px_50px_-12px_rgb(0,0,0)] w-52">
        {registry.map((ext) => (
          <li key={ext.name} className="rounded-md">
            <div
              onClick={() => openModal(ext.modal)}
              className="p-2 flex gap-4"
            >
              {ext.icon || <Attach fill="#A3ACBE" width="20" height="20" />}
              {ext.label}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExtensionSelector
