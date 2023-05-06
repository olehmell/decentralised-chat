import {cx} from "@/utils/classname";
import {useMessageIdsByChannelId} from "@/services/subsocial/posts";
import {HasChatId} from "@/components/Chat/types";
import ChatItem from "@/components/Chat/ChatItem";

const Chat = ({ chatId }: HasChatId) => {
    const { data: messageIds, isLoading } = useMessageIdsByChannelId(chatId)

    return <div className={cx('max-w-screen-md', 'grow', 'my-3')}>
        {isLoading && <>Loading...</>}
        {messageIds?.map((messageId: string) => <ChatItem key={messageId} messageId={messageId}/>)}
    </div>
}

export default Chat