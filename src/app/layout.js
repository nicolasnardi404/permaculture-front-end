import React from "react";
import Header from "./components/header";
import "./globals.css";

export const metadata = {
  title: "Permaculture Chatbot",
  description: "Chat with an AI about permaculture",
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
