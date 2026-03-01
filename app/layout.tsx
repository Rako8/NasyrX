import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
    title: "NasyrX | Minimalist Luxury Footwear",
    description: "ELEVATE YOUR STEP with limited edition luxury sneakers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                />
            </head>
            <body className={`${spaceGrotesk.variable} font-display overflow-x-hidden min-h-screen flex flex-col bg-primary text-white`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
