import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { StellarProvider } from "@/contexts/StellarContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BPOFlow - Corporate Payroll Dashboard",
  description: "USDC → PHPT Bridge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} light h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@400,0,0,24&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface overflow-x-hidden min-h-full flex flex-col">
        <StellarProvider>
          {children}
        </StellarProvider>
      </body>
    </html>
  );
}
