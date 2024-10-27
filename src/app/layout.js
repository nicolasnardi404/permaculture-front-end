import React from "react";
import Header from "./components/header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata = {
  title: "Cyber Planta",
  description:
    "Learn about permaculture, mushrooms, and witches with the help of AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
