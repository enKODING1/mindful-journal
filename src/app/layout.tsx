import type { Metadata, Viewport } from 'next';
import { Jua } from 'next/font/google';
import Slider from '@/components/Slider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { MasterKeyProvider } from '@/lib/useMasterKey';
import './globals.css';

const jua = Jua({
    variable: '--font-jua',
    subsets: ['latin'],
    weight: '400',
});

export const metadata: Metadata = {
    title: '마음챙김 일기',
    description: '매일의 생각과 감정을 기록하는 나만의 암호화 일기',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: '마음챙김 일기',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body
                className={`${jua.variable} antialiased bg-base-100 min-h-screen font-[family-name:var(--font-jua)]`}
            >
                <GoogleAnalytics />
                <ServiceWorkerRegister />
                <Slider />
                <MasterKeyProvider>
                    <main
                        className="md:pb-0"
                        style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' }}
                    >
                        {children}
                    </main>
                </MasterKeyProvider>
            </body>
        </html>
    );
}
