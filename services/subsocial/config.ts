import type { SubsocialApi } from '@subsocial/api'

export interface SubsocialConnectionConfig {
    substrateUrl: string
    ipfsNodeUrl: string
    ipfsAdminNodeUrl?: string
    postConnectConfig?: (api: SubsocialApi) => void
}

export const CRUST_TEST_AUTH_KEY =
    'c3ViLTVGQTluUURWZzI2N0RFZDhtMVp5cFhMQm52TjdTRnhZd1Y3bmRxU1lHaU45VFRwdToweDEwMmQ3ZmJhYWQwZGUwNzFjNDFmM2NjYzQzYmQ0NzIxNzFkZGFiYWM0MzEzZTc5YTY3ZWExOWM0OWFlNjgyZjY0YWUxMmRlY2YyNzhjNTEwZGY4YzZjZTZhYzdlZTEwNzY2N2YzYTBjZjM5OGUxN2VhMzAyMmRkNmEyYjc1OTBi' // can only be used for testnet.

const DEFAULT_PROD_CONFIG: SubsocialConnectionConfig = {
    substrateUrl: 'wss://xsocial.subsocial.network',
    ipfsNodeUrl: 'https://ipfs.subsocial.network',
    ipfsAdminNodeUrl: 'https://gw.crustfiles.app',
    postConnectConfig: (api) => {
        api.ipfs.setWriteHeaders({
            authorization: 'Basic ' + CRUST_TEST_AUTH_KEY,
        })
    },
}

export function getConnectionConfig() {
    return DEFAULT_PROD_CONFIG
}
