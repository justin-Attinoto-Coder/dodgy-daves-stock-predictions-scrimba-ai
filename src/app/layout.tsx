
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="polygon-api-key" content={process.env.POLYGON_API_KEY || ""} />
      </head>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
