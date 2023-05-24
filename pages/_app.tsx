import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useRef } from "react";
import { useMyAccount } from "@/stores/my-account";
import Moralis from 'moralis';

export default function App({ Component, pageProps }: AppProps) {
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true
    useMyAccount.getState().init().catch(console.error)
  }, [])


  useEffect(() => {

    const init = async () => {
      try {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        });
      } catch (e) { }
    }
    init()
  }, [])

  return <Component {...pageProps} />
}
