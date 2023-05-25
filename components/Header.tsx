import { useMyAccount } from '@/stores/my-account'
import LogoSvg from '@/assets/icons/grill-logo.svg'

const Header = () => {
  const address = useMyAccount((state) => state.address)

  const login = useMyAccount((state) => state.login)
  const logout = useMyAccount((state) => state.logout)

  return (
    <div className="sticky top-0 z-20 flex h-14 items-center border-b border-border-gray bg-background-light bg-slate-800 border-gray-700">
      <div className="relative mx-auto w-full max-w-screen-md px-2 grid h-14 items-center py-1.5">
        <div className="flex items-center justify-between gap-4">
          <LogoSvg />
          {address ? (
            <span>
              <span className="mr-4">{address}</span>
              <button
                onClick={() => logout()}
                className="btn btn-outline border-indigo-600 hover:bg-transparent hover:ring-2 hover:text-white min-h-fit h-auto py-3 normal-case font-normal hover:border-indigo-700 px-5 flex-nowrap rounded-3xl"
              >
                Logout
              </button>
            </span>
          ) : (
            <button
              onClick={() => login()}
              className="btn min-h-fit h-auto py-3 px-5 hover:border-indigo-700 hover:bg-indigo-700 flex-nowrap normal-case font-normal rounded-3xl"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
