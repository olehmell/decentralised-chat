import React, { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'react-hot-toast'
import TermsOfService from "@/components/Captcha/TermsOfService";

export type CaptchaInvisibleProps = {
    children: (
        runCaptcha: () => Promise<string | null>,
    ) => React.ReactNode
}

export function getCaptchaSiteKey() {
    return process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? ''
}

export default function CaptchaInvisible({ children }: CaptchaInvisibleProps) {
    const captchaRef = useRef<ReCAPTCHA>(null)
    const runCaptcha = async () => {
        let token: string | null = null
        try {
            token = (await captchaRef.current?.executeAsync()) ?? null
        } catch (e) {
            console.error(e)
        }
        if (!token) {
            toast.error('Captcha Failed! Please try again')
            return null
        }
        captchaRef.current?.reset()
        return token
    }
    return (
        <div className='pb-3 w-full'>
            {children(runCaptcha)}
            <TermsOfService />
            <ReCAPTCHA
                sitekey={getCaptchaSiteKey()}
                theme='dark'
                ref={captchaRef}
                size='invisible'
                badge='inline'
            />
        </div>
    )
}
