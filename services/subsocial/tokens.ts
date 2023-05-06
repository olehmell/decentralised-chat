import {ApiRequestTokenBody, ApiRequestTokenResponse} from "@/pages/api/request-token";
import axios from "axios";
import { useMyAccount } from '@/stores/my-account'
import useSWRMutation from "swr/mutation";
import {getSubsocialApi} from "@/services/subsocial/api";
import {IpfsContent} from "@subsocial/api/substrate/wrappers";
import useWaitHasEnergy from "@/services/subsocial/energy";
import {IpfsCommentContent} from "@subsocial/api/types";

export async function requestToken({
                                       address,
                                       captchaToken,
                                   }: ApiRequestTokenBody) {
    const res = await axios.post('/api/request-token', {
        captchaToken,
        address,
    })
    const data = res.data as ApiRequestTokenResponse
    if (!data.success) throw new Error(data.message)
    return res
}

type SendMessageParams = {
    content: IpfsCommentContent,
}
export function useSendMessage(channelId: number) {
    const signer = useMyAccount((state) => state.signer)
    const waitHasBalance = useWaitHasEnergy()

    return useSWRMutation(['commentIds-by-postId', channelId], async ([_, rootPostId], { arg }: { arg: SendMessageParams }) => {
        const { ipfs, substrateApi } = await getSubsocialApi()

        const { content } = arg

        const cid = await ipfs.saveJson(content)

        const postTxs = (await substrateApi).tx.posts

        await waitHasBalance()

        const tx = postTxs.createPost(
            null,
            { Comment: { parentId: null, rootPostId } },
            IpfsContent(cid)
        )

        if (!signer) throw new Error('Signer is not defined')

        return new Promise((resolve, reject) => {
            tx.signAndSend(signer, (result) => {
                if (result.status.isInBlock) {
                    resolve(result)
                } else if (result.status.isFinalized) {
                    resolve(result)
                }else if (result.status.isDropped) {
                    reject(result)
                } else if (result.status.isInvalid) {
                    reject(result)
                } else if (result.status.isUsurped) {
                    reject(result)
                } else if (result.status.isRetracted) {
                    reject(result)
                }
            })
        })
    })

}

export function useRequestTokenAndSendMessage(channelId: number) {
    const address = useMyAccount((state) => state.address)

    const { trigger: sendMessage } = useSendMessage(channelId)
    const login = useMyAccount((state) => state.login)

    const requestTokenAndSendMessage = async (
        params: Omit<ApiRequestTokenBody, 'address'> &
            Parameters<typeof sendMessage>[0]
    ) => {
        const { ...sendMessageParams } = params
        let usedAddress: string = address ?? ''
        if (!address) {
            const address = await login()
            if (!address) throw new Error('Failed to login')
            usedAddress = address
        }

        console.log('usedAddress', usedAddress)

        await requestToken({ address: usedAddress, captchaToken: params.captchaToken })
        await sendMessage(sendMessageParams)
    }

    return useSWRMutation(
        'requestTokenAndSendMessage',
        (_, { arg }:
            { arg: SendMessageParams & Omit<ApiRequestTokenBody, 'address'> }
        ) => requestTokenAndSendMessage(arg))
}
