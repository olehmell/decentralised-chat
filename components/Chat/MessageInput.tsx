import Send from '@/assets/icons/send.svg'
import {cx} from "@/utils/classname";
import {useRef} from "react";
import {useRequestTokenAndSendMessage, useSendMessage} from "@/services/subsocial/tokens";
import {DEFAULT_CHAT_ID} from "@/constants/chatId";
import CaptchaInvisible from "@/components/Captcha/InvisibleCaptcha";
import {useMyAccount} from "@/stores/my-account";

const MessageInput = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const {trigger: requestTokenAndSendMessage} = useRequestTokenAndSendMessage(DEFAULT_CHAT_ID)
    const {trigger: sendMessage} = useSendMessage(DEFAULT_CHAT_ID)
    const shouldSendMessage = useMyAccount((state) => !!state.energy)

    const handle = async (token?: string | null) => {
        const message = inputRef.current?.value
        if (!message) return

        inputRef.current!.disabled = true

        const content = {
            body: message
        }

        if (token) {
            await requestTokenAndSendMessage({
                captchaToken: token,
                content
            })
        } else {
            await sendMessage({content})
        }

        inputRef.current!.disabled = false
        inputRef.current!.value = ''
    }

    return <div className="form-control sticky bottom-0 z-50 h-20 bg-base-100 flex items-end w-full">
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
                return <div className="input-group w-full">
                        <textarea ref={inputRef} className={cx("textarea textarea-bordered", 'w-full')} rows={1}
                                  placeholder="Write message..."></textarea>
                        <button onClick={onClick} className="btn btn-square">
                            <Send className='relative top-px h-4 w-4'/>
                        </button>
                    </div>
            }}
        </CaptchaInvisible>
    </div>
}

export default MessageInput