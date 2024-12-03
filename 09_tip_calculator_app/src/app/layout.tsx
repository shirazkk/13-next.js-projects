import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Tip Calculator - Calculate Restaurant Tips Easily",
    template: "%s | Tip Calculator",
  },
  description:
    "An easy-to-use tip calculator that helps you quickly determine tip amounts and total bill costs for restaurants, cafes, and services.",
  keywords: [
    "tip calculator",
    "restaurant tip",
    "gratuity calculator",
    "bill calculator",
    "service tip",
  ],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Tip Calculator",
    description:
      "Easily calculate tips and total bill amounts with our simple online tool.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
