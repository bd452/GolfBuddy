This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project uses **Yarn 4** with **PnP (Plug'n'Play)** and **Corepack** for package management.

### Prerequisites

- Node.js 18+ (with Corepack enabled)
- Corepack is enabled by default in Node.js 18+, or run `corepack enable`

### Installation

```bash
# Install dependencies (Yarn will be automatically used via Corepack)
yarn install
```

**Note**: This project uses Yarn PnP (Plug'n'Play), which means there is no `node_modules` directory. Dependencies are resolved directly from the `.pnp.cjs` file. This provides faster installs and better dependency resolution. Next.js has built-in support for Yarn PnP, so no additional configuration is needed.

### Development

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
