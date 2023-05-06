import {cx} from "@/utils/classname";
import MessagesList from "@/components/Chat/MessagesList";
import MessageInput from "@/components/Chat/MessageInput";
import {DEFAULT_CHAT_ID} from "@/constants/chatId";
import React from "react";

const Chat = () => {
    return <div className={cx('max-w-screen-md', 'grow')}>
        <MessagesList chatId={DEFAULT_CHAT_ID.toString()}/>
        <MessageInput/>
    </div>
}

export default Chat