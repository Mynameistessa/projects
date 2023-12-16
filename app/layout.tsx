import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Banner from "@/components/banner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sylvera Projects",
  description: "Sylvera Frontend Task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Banner />
        <main className="flex min-h-screen flex-col justify-between p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
