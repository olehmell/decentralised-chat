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

## Extending Grill with custom extensions

Grill light app supports extending the functionality of chat element with custom set of extensions that can be built on top of it. 

Each extension should have:
- A very specific usecase / purpose, for example: sending NFTs or image from IPFS / URL, etc. 
- A new JSON schema to be used in IPFS extending the [IExtension](/components/Extension/types.tsx) class.
- A utility class for serializing / de-serializing json and implementing the preview renderer.
- An input modal for the asking data from users.

After creation of above requirements, you just need to add your extension to Grill Light Registry, [here](components/Extension/registry.tsx).

## Environment variables 🌎

Below is the list of environment variables that you can use to customize your chat, based upon your needs and the needs of your community.

| Name | Description   | Required? |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| SERVER_MNEMONIC  | Wallet mnemonic of the server, in order to send automatically users [Energy](https://docs.subsocial.network/docs/basics/lightpaper/architecture/energy) | Yes |
| CAPTCHA_SECRET   | ReCaptcha secret, read [here](https://developers.google.com/recaptcha/intro) for more information.  | Yes |
| NEXT_PUBLIC_CAPTCHA_SITE_KEY | ReCaptcha sitekey | Yes|
| NEXT_PUBLIC_MORALIS_API_KEY | API key to fetch NFT metadata from Moralis. Get your own API key [here](https://moralis.io/api/nft/).  | Yes |

We have an example enveironment file created for you [here](.env.example).

## Facing Issues?
If you are building an extension on top of Grill light or having hard time running it locally, join our [Devs Chat](https://t.me/+ZzvLu0ZfkQwxNGQy) and let us know about it.

