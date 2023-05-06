import {usePost} from "@/services/subsocial/posts";
import {getRelativeTime} from "@/services/time";
import RobotAvatar from "@/components/Profile/Avatar";
import ShortAddress from "@/components/Profile/ShortAddress";
import {useMemo} from "react";
import {cx} from "@/utils/classname";
import {useMyAccount} from "@/stores/my-account";
import {toSubsocialAddress} from "@subsocial/utils";
type ChatItemProps = {
    messageId: string
}

const ChatItem = ({messageId}: ChatItemProps) => {
    const {data, isLoading} = usePost(messageId)
    const myAddress = useMyAccount((state) => state.address)
    const {content, struct} = data || {}

    const isMyMessage = useMemo(() =>
        toSubsocialAddress(struct?.ownerId) === toSubsocialAddress(myAddress ?? ''),
        [ myAddress, struct?.ownerId ])


    if (isLoading || !data) return null


    return (
        <div className={cx('chat', isMyMessage ? 'chat-end' : 'chat-start')}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <RobotAvatar address={struct?.ownerId ?? ''} />
                </div>
            </div>

            <div className="chat-bubble">
                <div className="chat-header">
                    <ShortAddress address={struct?.ownerId ?? ''} />
                </div>
                <div className={cx({ 'text-right': isMyMessage })}>{content?.body}</div>
            </div>
            <div className="chat-footer opacity-50">
                {getRelativeTime(struct?.createdAtTime || 0)}
            </div>
        </div>
    )
}

export default ChatItem