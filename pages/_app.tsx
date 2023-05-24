import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useRef } from "react";
import { useMyAccount } from "@/stores/my-account";
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true
    useMyAccount.getState().init().catch(console.error)
  }, [])

  return <SWRConfig value={{ fallback: pageProps.fallback }}>
    <Component {...pageProps} />
  </SWRConfig>
}
