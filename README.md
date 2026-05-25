<<<<<<< HEAD
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Backend configuration

This site uses Strapi for categories and product data. Create a `.env.local` file with the following values before running locally:

```env
NEXT_PUBLIC_STRAPI_URL=https://strapi-graphichouse-v1-iwpx.onrender.com
STRAPI_API_TOKEN=your_strapi_api_token_here
```

If Strapi public access is not enabled, the `STRAPI_API_TOKEN` value must be set in Render's Environment Variables panel. Add the same key/value there and redeploy the frontend after saving it.

### Render deployment checklist

1. Open your Render service dashboard.
2. Go to **Environment**.
3. Add `NEXT_PUBLIC_STRAPI_URL` with your Strapi URL.
4. Add `STRAPI_API_TOKEN` with the API token from Strapi.
5. Save, then redeploy the service.

If the token is missing, the frontend will keep showing the built-in demo content instead of live admin data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
=======
# graphichousemay2026
>>>>>>> 199d304f5a4505b1226d523c14e208a7f136a103
