import { Inter } from 'next/font/google'
import Chat from "@/components/Chat/Chat";
import {cx} from "@/utils/classname";
import Header from "@/components/Header";
import {DEFAULT_CHAT_ID} from "@/constants/chatId";
import React from "react";
import {useMyAccount} from "@/stores/my-account";

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
      <main>
        <Header chatId={DEFAULT_CHAT_ID.toString()}/>
        <section
            id={'chat'}
            className={cx(inter.className, 'min-h-screen', 'flex', 'flex-row', 'items-end', 'justify-center')}
        >
          <Chat />
        </section>
      </main>
  )
}
