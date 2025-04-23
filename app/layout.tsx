import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/components/global/Container";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/utils/numItemsInCart";
import QueryProvider from "./providers/QueryProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next JS Store Project",
  description: "An E-commerce store made with NextJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryProvider>
            <Providers>
              <CartProvider>
                <Navbar />
                <Container className="py-20">{children}</Container>
              </CartProvider>
            </Providers>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
