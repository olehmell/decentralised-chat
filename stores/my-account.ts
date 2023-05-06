import {
    decodeSecretKey,
    encodeSecretKey,
    generateAccount,
    loginWithSecretKey,
    Signer,
} from '@/utils/account'
import { create } from 'zustand'
import {getSubsocialApi} from "@/services/subsocial/api";

type State = {
    isInitialized?: boolean
    address: string | null
    signer: Signer | null
    energy: number | null
    encodedSecretKey: string | null
    _unsubscribeEnergy: () => void
}

type Session = {
    encodedSecretKey: string
    address: string
    isNewSecretKey?: boolean
}
type Actions = {
    init: () => Promise<void>
    login: (
        secretKey?: string,
        isInitialization?: boolean
    ) => Promise<string | false>
    logout: () => void
    _subscribeEnergy: () => Promise<void>
}

const ACCOUNT_STORAGE_KEY = 'account'

const initialState: State = {
    address: null,
    signer: null,
    energy: null,
    encodedSecretKey: null,
    _unsubscribeEnergy: () => undefined,
}
export const useMyAccount = create<State & Actions>()((set, get) => ({
    ...initialState,
    login: async (secretKey, isInitialization) => {
        let address: string = ''
        try {
            if (!secretKey) {
                const { secretKey: newSecretKey } =
                    await generateAccount()
                secretKey = newSecretKey
            }

            const signer = await loginWithSecretKey(secretKey)
            const encodedSecretKey = encodeSecretKey(secretKey)
            address = signer.address
            set({
                address,
                signer,
                encodedSecretKey,
            })
            localStorage.setItem(ACCOUNT_STORAGE_KEY, encodedSecretKey)
            get()._subscribeEnergy()
        } catch (e) {
            console.log('Failed to login', e)
            return false
        }
        return address
    },
    _subscribeEnergy: async () => {
        const { address, _unsubscribeEnergy } = get()
        _unsubscribeEnergy()
        if (!address) return

        const subsocialApi = await getSubsocialApi()
        const substrateApi = await subsocialApi.substrateApi
        const unsub = substrateApi.query.energy.energyBalance(
            address,
            (energyAmount) => {
                const parsedEnergy = parseFloat(energyAmount.toPrimitive().toString())
                set({
                    energy: parsedEnergy,
                    _unsubscribeEnergy: () => unsub.then((unsub) => unsub()),
                })
            }
        )
    },
    logout: () => {
        const { _unsubscribeEnergy } = get()
        _unsubscribeEnergy()

        localStorage.removeItem(ACCOUNT_STORAGE_KEY)
        set({ ...initialState })
    },
    init: async () => {
        const { isInitialized, login } = get()

        // Prevent multiple initialization
        if (isInitialized !== undefined) return
        set({ isInitialized: false })

        const encodedSecretKey = localStorage.getItem(ACCOUNT_STORAGE_KEY)

        let successLogin = false
        if (encodedSecretKey) {
            const secretKey = decodeSecretKey(encodedSecretKey)
            const address = await login(secretKey, true)

            if (address) successLogin = true
            else localStorage.removeItem(ACCOUNT_STORAGE_KEY)
        }
        set({ isInitialized: true })
    },
}))
