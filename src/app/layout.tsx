import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Slider from '@/components/Slider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: '마음챙김 일기',
    description: '마음챙김 일기',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-300 min-h-screen`}
            >
                <GoogleAnalytics />
                <Slider />
                {children}
            </body>
        </html>
    );
}
