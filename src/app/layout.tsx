import type { Metadata } from 'next';
import { Jua } from 'next/font/google';
import Slider from '@/components/Slider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { MasterKeyProvider } from '@/lib/useMasterKey';
import './globals.css';

const jua = Jua({
    variable: '--font-jua',
    subsets: ['latin'],
    weight: '400',
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
                className={`${jua.variable} antialiased bg-base-300 min-h-screen font-[family-name:var(--font-jua)]`}
            >
                <GoogleAnalytics />
                <Slider />
                <MasterKeyProvider>
                    <main className="pb-16 md:pb-0">{children}</main>
                </MasterKeyProvider>
            </body>
        </html>
    );
}
