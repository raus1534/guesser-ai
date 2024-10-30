import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CategoryProvider } from "@context/CategoryContext";

export const metadata: Metadata = {
  title: "Guesser",
  description: "AI Based Guesser",
};

const spaceGrotest = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotest.className}>
        <CategoryProvider>{children}</CategoryProvider>
      </body>
    </html>
  );
}
