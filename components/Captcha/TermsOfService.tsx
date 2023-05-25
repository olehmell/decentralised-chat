import {cx} from "@/utils/classname";

export default function TermsOfService() {
    return <p className={cx('text-xs text-gray-600', 'text-center', 'pt-1')}>
        This site is protected by reCAPTCHA and the Google{' '}
        <a
            className={cx('underline')}
            href='https://policies.google.com/privacy'
        >
            Privacy Policy
        </a>{' '}
        and{' '}
        <a
            className={cx('underline')}
            href='https://policies.google.com/terms'
        >
            Terms of Service
        </a>{' '}
        apply.
    </p>
}