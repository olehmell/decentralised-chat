
<p align="center">
  <img height=100 src="https://raw.githubusercontent.com/dappforce/grillchat/main/src/assets/logo/logo.svg" />
</p>
<p align="center">
  <strong>
    A light-weight version of <a href="https://x.grill.chat">Grill.chat</a> 💬
  </strong>
</p>

---

## How to run locally 🏃‍♂️

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
cp .env.example .env
```

### 3. Run the server

```bash
yarn dev
```

Congrats 🎉, you can now access the app at http://localhost:3000

## Grill extensions

Light Grill can be extended with new functionality via custom extensions.

Each extension should have:
- A specific usecase, for example: share NFTs in chat or uploade images to IPFS, etc.
- A JSON schema that will extend IPFS content of the chat message. See `ExtensionWidget` class in [types.tsx](/components/Extensions/types.tsx).
- An input modal for the asking data from users.
- A render function for your extension widget.

Once you created your extension, add it to the Extension Registry of Light Grill [here](/components/Extensions/registry.tsx).

## Environment variables 🌎

Below is the list of environment variables that you can use to customize your chat, based upon your needs and the needs of your community.

| Name | Description   | Required? |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| SERVER_MNEMONIC  | Wallet mnemonic of the server, in order to send automatically users [Energy](https://docs.subsocial.network/docs/basics/lightpaper/architecture/energy) | Yes |
| CAPTCHA_SECRET   | ReCaptcha secret, read [here](https://developers.google.com/recaptcha/intro) for more information.  | Yes |
| NEXT_PUBLIC_CAPTCHA_SITE_KEY | ReCaptcha sitekey | Yes|
| NEXT_PUBLIC_MORALIS_API_KEY | API key to fetch NFT metadata from Moralis. Get your own API key [here](https://moralis.io/api/nft/).  | No |

We have an example enveironment file created for you [here](.env.example).

## Facing Issues?
If you are building an extension on top of Grill light or having hard time running it locally, join our [Devs Chat](https://t.me/+0bn2xWmRXdpmM2Y6) and let us know about it.
