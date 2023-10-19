import grill from '@subsocial/grill-widget'
import {useSignal} from "@preact/signals-react";
import {useEffect} from "react";
import {Resource} from "@subsocial/resource-discussions";
import copy from 'copy-to-clipboard';

const MY_MIRROR_URL = 'https://mirror.xyz/0x26674D44c3a4c145482Dd360069a8e5Fee2Ec74C/pTKZOISLI64e2-NTfD2O5VZJ0ajGs3J_urRXPhX7Q5M'
const parseUrl = (url: string) => {
  const {host, pathname} = new URL(url);

  return new Resource({
    schema: 'social',
    app: host,
    resourceType: 'post',
    resourceValue: {
      id: pathname.split('/')[1]
    },
  })
}

export default function GrillPage() {
  const resource = useSignal(parseUrl(MY_MIRROR_URL))
  const grillUrl = useSignal('')
  const coppied = useSignal(false)

  useEffect(() => {
    grill.init(
      {
        hub: {id: '1198'},
        theme: 'light',
        channel: {
          type: 'resource',
          resource: resource.value,
          settings: {
            enableBackButton: false,
            enableLoginButton: false,
            enableInputAutofocus: true,
          },
          metadata: {
            title: 'Discuss the article here',
            image: 'bafybeigv5t5wz7uk75vouc3w652rvyhcjct3d265ada2fjot2vwvfpagly'
          },
        },
        onWidgetCreated: (iframe) => {
          grillUrl.value = iframe.src + '&height=800&display=iframe'
          return iframe
        }
      }
    )
  }, [resource.value])

  return <div className="grid grid-cols-2 gap-4 mx-4">
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">What is your article URL?</span>
          </label>
          <input defaultValue={MY_MIRROR_URL} type="text" onChange={e => {
            resource.value = parseUrl(e.target.value)
          }} placeholder="Type your article URL here" className="input input-bordered w-full max-w-xs"/>
        </div>
        <div className="border-2 rounded-md p-3 mt-4">
          <p className='break-words'>{grillUrl.value}</p>
          <div className='mt-2'>
            <button className="btn btn-sm btn-primary" onClick={() => {
              copy(grillUrl.value)
              coppied.value = true
            }}
            >Copy</button>
            {coppied.value && <span className='ml-2'>Copied!</span>}
          </div>
        </div>
      </div>
      <div id={'grill'} style={{height: '100vh'}}></div>
    </div>
}