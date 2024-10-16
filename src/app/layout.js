import React from "react";
import Header from "./components/header";
import "./globals.css";

export const metadata = {
  title: "Cyber Planta",
  description:
    "Learn about permaculture, mushrooms, and witches with the help of AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
