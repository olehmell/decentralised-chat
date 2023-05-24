import Send from '@/assets/icons/send.svg'
import { cx } from "@/utils/classname";
import { useRef } from "react";
import { useRequestTokenAndSendMessage, useSendMessage } from "@/services/subsocial/tokens";
import { DEFAULT_CHAT_ID } from "@/constants/chatId";
import CaptchaInvisible from "@/components/Captcha/InvisibleCaptcha";
import { useMyAccount } from "@/stores/my-account";
import ExtensionPreviews from './ExtensionPreviews';
import useExtensionsStore from '@/stores/extensions';
import ExtensionSelector from './ExtensionSelector';

const MessageInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { trigger: requestTokenAndSendMessage } = useRequestTokenAndSendMessage(DEFAULT_CHAT_ID)
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
      extensions: extensions.map((i) => i.schema)
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

  return <div className="form-control sticky bottom-0 z-50 h-20 bg-white flex items-end w-full">
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
        return <>
          <ExtensionPreviews onClear={clear} extensions={extensions} />
          <div className="input-group w-full">
            <ExtensionSelector />
            <textarea ref={inputRef} className={cx("textarea textarea-bordered", 'w-full')} rows={1}
              placeholder="Write message..."></textarea>
            <button onClick={onClick} className="btn btn-square">
              <Send className='relative top-px h-4 w-4' />
            </button>
          </div>
        </>
      }}
    </CaptchaInvisible>
  </div>
}

export default MessageInput