<a href="https://x.grill.chat">
  <p align="center"><img height=100 src="https://raw.githubusercontent.com/dappforce/grillchat/main/src/assets/logo/logo.svg"/> Light</p>
</a>
<p align="center">
  <strong>
    A light-weight experimental version of Grill Chat 💬
  </strong>
</p>
<p align="center">
  Grill.chat offers a smooth and simple onboarding and user experience while still leveraging the power of blockchain technology.
</p>

---

## How to run Grill.chat locally 🏃‍♂️

Requirements:

- Node.js v16.0.0 or higher
- Yarn (you can use npm/pnpm if you want to)

### 1. Install dependencies

```bash
yarn
```

### 2. Setup environment variables

Copy the local example env file to .env

```bash
cp .env.local.example .env
```

### 3. Run the server

```bash
yarn dev
```

Congrats 🎉, you can now access the app at http://localhost:3000

## Environment variables 🌎

Below is the list of environment variables that you can use to customize your chat, based upon your needs and the needs of your community.

| Name | Description   | Required? |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| SERVER_MNEMONIC  | Wallet mnemonic of the server, in order to send automatically users [Energy](https://docs.subsocial.network/docs/basics/lightpaper/architecture/energy) | Yes |
| CAPTCHA_SECRET   | ReCaptcha secret, read [here](https://developers.google.com/recaptcha/intro) for more information.  | Yes |
| NEXT_PUBLIC_CAPTCHA_SITE_KEY | ReCaptcha sitekey | Yes|
| NEXT_PUBLIC_MORALIS_API_KEY | API key to fetch NFT metadata from Moralis. Get your own API key [here](https://moralis.io/api/nft/).  | Yes |

We have an example enveironment file created for you [here](.env.example).

