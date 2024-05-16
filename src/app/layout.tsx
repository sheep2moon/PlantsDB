import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer";
import { ThemeProvider } from "next-themes";
import { cn } from "../lib/utils";
import Providers from "../components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rośliny - Baza Danych",
    description: "Informacje o roślinach ozdobnych."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Providers>
                <body className={inter.className}>
                    <Header />
                    {children}
                    <Footer />
                </body>
            </Providers>
        </html>
    );
}
