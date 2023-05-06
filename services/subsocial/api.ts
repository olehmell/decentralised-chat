import { SubsocialApi } from '@subsocial/api'
import { getConnectionConfig, SubsocialConnectionConfig } from './config'

let subsocialApi: Promise<SubsocialApi> | null = null
export const getSubsocialApi = async (renew?: boolean) => {
    if (subsocialApi && !renew) return subsocialApi
    const api = connectToSubsocialApi(getConnectionConfig())
    subsocialApi = api
    return subsocialApi
}

async function connectToSubsocialApi(config: SubsocialConnectionConfig) {
    const { ipfsNodeUrl, substrateUrl, postConnectConfig, ipfsAdminNodeUrl } =
        config
    const api = await SubsocialApi.create({
        ipfsNodeUrl,
        ipfsAdminNodeUrl,
        substrateNodeUrl: substrateUrl,
    })

    // @ts-ignore
    console.log('IPFS', api.ipfs._ipfsAdminNodeUrl)

    postConnectConfig && postConnectConfig(api)
    return api
}
