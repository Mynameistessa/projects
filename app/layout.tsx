import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Banner from "@/components/banner";
import "./globals.css";
import { SWRProvider } from "@/providers/swr";

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
      <body
        className={`${inter.className} bg-white dark:bg-white min-h-screen flex flex-col`}
      >
        <Banner />
        <main className="flex flex-col justify-between m-8">
          <SWRProvider>{children}</SWRProvider>
        </main>
      </body>
    </html>
  );
}
