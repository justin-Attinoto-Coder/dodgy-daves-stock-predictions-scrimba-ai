import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
