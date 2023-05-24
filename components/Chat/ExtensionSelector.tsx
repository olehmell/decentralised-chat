import Attach from '@/assets/icons/attach.svg'
import { registry } from '../Extension/registry'
import useModalStore from '@/stores/modal'

const ExtensionSelector = () => {

  const { openModal } = useModalStore()

  return <div className="dropdown dropdown-top dropdown-hover">
    <label className="btn btn-square"><Attach fill="#fff" className="h-4 w-4" /></label>
    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {registry.map(ext => (
        <li className='border rounded-md mb-2'>
          <div onClick={() => openModal(ext.modal)} className="">
            {ext.icon}
            {ext.name}
          </div>
        </li>
      ))}
    </ul>
  </div>
}

export default ExtensionSelector