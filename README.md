# Dodgy Dave's Stock Predictions - Scrimba AI

## Project Overview

This is a multi-app AI playground built with Next.js, OpenAI, and Polygon.io APIs. It features:

- **Dodgy Dave's Stock Predictions:**
  - Enter one or more stock tickers and get a hilariously unreliable, AI-generated report on their recent performance and buy/hold/sell advice.
  - Add or remove tickers before generating a report.
  - Data is fetched securely and analyzed with OpenAI for creative, entertaining results.

- **ArtMatch:**
  - Generate AI art from any prompt you enter.
  - Get a creative, philosophical, or goofy AI-generated description of your image.
  - Robust error handling and a modern, branded UI.

- **Pollyglot:**
  - Instantly translate text into multiple languages using AI.
  - See translations and optionally generate an image for your prompt.

- **Explain:**
  - Get clear, concise AI explanations for any topic, tailored to your audience (e.g., "Explain quantum physics to a 10-year-old").

All apps are accessible from a unified dashboard, with secure API integration, robust error handling, and a beautiful Tailwind CSS UI.

---

Scrimba AI project for humorous stock predictions using OpenAI and Polygon.io APIs.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and TypeScript.

## Getting Started

First, copy the environment variables file and add your API keys:

```bash
cp .env.example .env
```

Then edit the `.env` file and add your actual API keys:
- OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- Polygon.io API key from [Polygon.io](https://polygon.io/)

Then, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
