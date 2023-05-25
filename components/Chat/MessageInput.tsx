import Send from '@/assets/icons/send.svg'
import { cx } from '@/utils/classname'
import { useRef, KeyboardEventHandler } from 'react'
import {
  useRequestTokenAndSendMessage,
  useSendMessage,
} from '@/services/subsocial/tokens'
import { DEFAULT_CHAT_ID } from '@/constants/chatId'
import CaptchaInvisible from '@/components/Captcha/InvisibleCaptcha'
import { useMyAccount } from '@/stores/my-account'
import ExtensionPreviews from './ExtensionPreviews'
import useExtensionsStore from '@/stores/extensions'
import ExtensionSelector from './ExtensionSelector'

const MessageInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { trigger: requestTokenAndSendMessage } =
    useRequestTokenAndSendMessage(DEFAULT_CHAT_ID)
  const { trigger: sendMessage } = useSendMessage(DEFAULT_CHAT_ID)
  const shouldSendMessage = useMyAccount((state) => !!state.energy)

  // List of selected Extensions in the Message Input.
  const { extensions, clearExtensions } = useExtensionsStore()

  const handle = async (token?: string | null) => {
    let message = inputRef.current?.value
    if (!message && extensions.length == 0) return

    inputRef.current!.disabled = true

    if (extensions.length > 0) {
      // Set message to empty string if extensions sent with no message.
      message ??= ''
    }

    const content = {
      body: message!,
      extensions: extensions.map((i) => i.schema),
    }

    if (token) {
      await requestTokenAndSendMessage({
        captchaToken: token,
        content,
      })
    } else {
      await sendMessage({ content })
    }

    clear()
  }

  const clear = () => {
    inputRef.current!.disabled = false
    inputRef.current!.value = ''
    clearExtensions()
  }

  return (
    <div className="form-control sticky bottom-0 z-50 h-21 bg-base-100 flex items-end w-full pt-2">
      <CaptchaInvisible>
        {(runCaptcha) => {

          const onClick = async () => {
            if (shouldSendMessage) {
              await handle()
              return
            }
            const token = await runCaptcha()
            await handle(token)
          }

          const onEnterKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
            if (event.key === 'Enter') {
              onClick()
            }
          }

          return (
            <>
              <ExtensionPreviews onClear={clear} extensions={extensions} />
              <div className="w-full flex relative">
                <ExtensionSelector />
                <div className='w-full relative flex-col'>
                  <textarea
                    ref={inputRef}
                    className={cx(
                      'textarea textarea-bordered text-white focus: focus:border-indigo-700 rounded-3xl w-full'
                    )}
                    placeholder="Write message..."
                    rows={1}
                    autoComplete="off"
                    autoCapitalize="sentences"
                    autoCorrect="off"
                    spellCheck="false"
                    onKeyDown={onEnterKeyDown}
                  ></textarea>
                  <button
                    onClick={onClick}
                    className="btn hover:bg-indigo-700 hover:border-indigo-700 rounded-full min-h-fit h-auto p-2 absolute right-[7px] top-[7px]"
                  >
                    <Send className="relative top-px h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )
        }}
      </CaptchaInvisible>
    </div>
  )
}

export default MessageInput
