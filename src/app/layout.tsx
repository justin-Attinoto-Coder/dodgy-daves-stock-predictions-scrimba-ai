import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Dodgy Dave's Stock Predictions",
  description: "Hilariously unreliable stock market predictions powered by AI - for entertainment purposes only!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="polygon-api-key" content={process.env.POLYGON_API_KEY || ""} />
      </Head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
