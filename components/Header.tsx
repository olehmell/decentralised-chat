import {useMyAccount} from "@/stores/my-account";

const Header = () => {
    const address = useMyAccount((state) => state.address)

    const login = useMyAccount((state) => state.login)
    const logout = useMyAccount((state) => state.logout)

    return <div className="navbar bg-base-100 w-full sticky top-0 z-50 border-b border-gray-300 flex justify-center">
        <div>{address
            ? <span>
                <span className='mr-2'>{address}</span>
                <button onClick={() => logout()} className="btn px-3">
                    Logout
                </button>
            </span>
            : <button onClick={() => login()} className="btn px-3">
                Login
            </button>}
        </div>
    </div>
}

export default Header