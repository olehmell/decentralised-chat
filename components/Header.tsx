import {usePost} from "@/services/subsocial/posts";
import {HasChatId} from "@/components/Chat/types";
import {useMyAccount} from "@/stores/my-account";
import Avatar from "@/components/Profile/Avatar";
import ShortAddress from "@/components/Profile/ShortAddress";

type ChatHeaderProps = HasChatId
const Header = ({ chatId }: ChatHeaderProps) => {
    const { data } = usePost(chatId)
    const address = useMyAccount((state) => state.address)

    return <div className="navbar bg-base-100 w-full sticky top-0 z-50 border-b border-gray-300 flex justify-center">
        <div>{address ? <ShortAddress address={address} /> : 'User not found' }</div>
    </div>
}

export default Header