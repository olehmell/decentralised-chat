import { getSubsocialApi } from "@/services/subsocial/api";
import useSWR from 'swr'
import {useEffect} from "react";
import {VoidFn} from "@polkadot/api-base/types";
import {keyBuilder} from "@/utils/keys";

export const getMessageIdsByChannelId = async (channelId: string) => {
    const api = await getSubsocialApi();
    return api.blockchain.getReplyIdsByPostId(channelId);
}
export async function getPosts (ids: string[]) {
    const api = await getSubsocialApi();
    return await api.findPublicPosts(ids);
}

async function getPost (id: string) {
    const posts = await getPosts([id]);
    return posts[0] || null;
}

export const usePost = (id: string) => {
    return useSWR(keyBuilder.getPostIdKey(id), ([_, id]) => getPost(id))
}

export const useMessageIdsByChannelId = (channelId: string) => {
    const swrData = useSWR(keyBuilder.getCommentIdsByPostIdKey(channelId), ([_, channelId]) => getMessageIdsByChannelId(channelId))

    useEffect(() => {
        let unsub: VoidFn | null = null;
        (async () => {
            const api = await getSubsocialApi();
            const substrateApi = await api.substrateApi;
            unsub = await substrateApi.query.posts.replyIdsByPostId(channelId, async (ids) => {
                const newIds = Array.from(ids.toPrimitive() as any).map((id) => id + '')
                await swrData.mutate(newIds)
            })
        })()

        return () => unsub?.();
    }, [channelId]);

    return swrData;
}
