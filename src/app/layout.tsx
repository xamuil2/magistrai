import type { Metadata } from "next";
import { Inter, Anek_Latin } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const anekLatin = Anek_Latin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MagistrAI",
  description: "by xamuil2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${anekLatin.className}`}>
        {children}
      </body>
    </html>
  );
}
