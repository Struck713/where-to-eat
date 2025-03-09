import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where To Eat",
  description: "Randomly find places to eat near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-400">
        {children}
      </body>
    </html>
  );
}
