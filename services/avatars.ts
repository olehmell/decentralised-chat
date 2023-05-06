import * as bottts from '@dicebear/bottts'
import { createAvatar } from '@dicebear/core'
import useSWR from "swr";

export const useAvatar = (address: string) => {
    const { data } = useSWR(['avatar', address], ([_, address]) => createAvatar(bottts, {
        size: 128,
        seed: address,
    }).toDataUriSync())

    return data;
}