# Abdul Hannan — Portfolio

A high-performance portfolio for Abdul Hannan, a full-stack and AI automation engineer. It pairs a distinctive editorial interface with a focused account of product, CRM, voice, and automation work.

## Highlights

- Responsive Next.js App Router experience with motion-safe scroll reveals
- Interactive project explorer for Codapet, Cred, Eroxr, and AfriCreative Jobs
- Server-side contact form powered by Nodemailer and Gmail
- Technical SEO: canonical metadata, Open Graph and Twitter cards, JSON-LD, `sitemap.xml`, and `robots.txt`
- Accessible semantic structure, keyboard-friendly controls, and reduced-motion support

## Stack

- Next.js 16 and React 19
- TypeScript
- Framer Motion
- Nodemailer
- Yarn 4

## Run locally

Requires Node.js 22+.

```bash
corepack enable
yarn install
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
yarn lint
yarn typecheck
yarn build
```

## Environment variables

Copy `.env.example` to `.env.local`, then set the values below. Never commit `.env.local` or a real Gmail App Password.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EMAIL_USER=hananabdul659@gmail.com
CONTACT_EMAIL=hananabdul659@gmail.com
EMAIL_APP_PASSWORD=your-16-character-gmail-app-password
```

Create the Gmail App Password in the Google account’s Security settings after enabling 2-Step Verification. The contact form validates inputs, includes a honeypot, applies a lightweight rate limit, and sends messages with the visitor’s email configured as the reply-to address.

## Deploy

Deploy to a Node.js-compatible host such as Vercel. Add the environment variables above in the host’s dashboard, set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain, then redeploy. This makes the canonical URL, sitemap, and robots configuration point to the production site.
