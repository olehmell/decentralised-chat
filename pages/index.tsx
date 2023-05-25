import { Inter } from 'next/font/google'
import Chat from "@/components/Chat/Chat";
import { cx } from "@/utils/classname";
import Header from "@/components/Header";
import { DEFAULT_CHAT_ID } from "@/constants/chatId";
import React from "react";
import { getMessageIdsByChannelId, getPosts } from "@/services/subsocial/posts";
import { unstable_serialize } from "swr";
import { PostData } from "@subsocial/api/types";
import Modal from '@/components/Modal/Modal';
import {keyBuilder} from "@/utils/keys";

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
      <main>
        <Header />
        <section
            id={'chat'}
            className={cx(inter.className, 'min-h-screen', 'flex', 'flex-row', 'items-end', 'justify-center', '')}
        >
          <Chat />
        </section>
        <Modal />
      </main>
  )
}

const fetchFallbackProps = async () => {
    const channelId = DEFAULT_CHAT_ID.toString()
    const messageIds = await getMessageIdsByChannelId(channelId)
    const messages = await getPosts(messageIds)

  console.log('messages', messages)

    const messagesFallback: Record<string, PostData> = {}

    messages.forEach((message) => {
        const key = unstable_serialize(keyBuilder.getPostIdKey(message.id))
        messagesFallback[key] = message
    })

    return {
        fallback: {
            [unstable_serialize(keyBuilder.getCommentIdsByPostIdKey(channelId))]: messageIds,
            ...messagesFallback
        }
    }
}

// SSG optimization
// export async function getStaticProps () {
//     const props = await fetchFallbackProps()
//
//     return {
//         props,
//         revalidate: 2
//     }
// }

// SSR optimization
export async function getServerSideProps () {
    const props = await fetchFallbackProps()

    return {
        props
    }
}