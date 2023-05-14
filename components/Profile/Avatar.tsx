import {useAvatar} from "@/services/avatars";
import Image from "next/image";

type RobotAvatarProps = {
    address: string
}
const RobotAvatar = ({ address }: RobotAvatarProps) => {
    const avatar = useAvatar(address)

    if (!avatar) return null

    return <Image
        sizes='5rem'
        className='relative'
        width={40}
        height={40}
        src={avatar}
        alt='avatar'
    />
}

export default RobotAvatar