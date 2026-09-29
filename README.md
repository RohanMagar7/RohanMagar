# Rohan Magar Portfolio

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Configure project enquiry email

The contact form sends project enquiries through the [Resend Email API](https://resend.com/docs/api-reference/emails/send-email). Copy `.env.example` to `.env.local`, create a Resend API key, and configure:

```env
RESEND_API_KEY=re_your_secret_api_key
CONTACT_EMAIL=magarohan8@gmail.com
CONTACT_FROM_EMAIL=Rohan Magar <hello@your-verified-domain.com>
```

The sender shown in `.env.example` is for Resend development only. For production, use an address on a domain you have verified in Resend. The visitor's email is included as Reply-To. Keep `.env.local` private; it is ignored by Git. Never use a `NEXT_PUBLIC_` prefix for the API key. Restart the development server after changing environment variables.

Set `NEXT_PUBLIC_SITE_URL` to your deployed HTTPS origin (for example, `https://yourdomain.com`) so canonical links, the sitemap and social metadata use the production domain. The example value is a placeholder and must be replaced before deployment.

The contact endpoint validates and limits valid submissions, silently drops entries that trip its honeypot field, and does not save enquiry data to a database. The in-memory rate limit allows five valid send attempts per client address in 15 minutes per server instance; invalid form submissions do not count. Use a shared rate-limit store if you deploy multiple server instances.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
