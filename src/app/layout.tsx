import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

const lexend = Lexend({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UM GPT",
  description: "A chatbot for Unified Mindfulness Practitioners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.className} antialiased`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
