import {useMemo} from "react";
import {toShortAddress} from "@/utils/account";

const ShortAddress = ({ address }: { address: string }) => {
    const shortAddress = useMemo(() => toShortAddress(address), [address])

    return <span className='text-gray-500'>{shortAddress}</span>
}

export default ShortAddress