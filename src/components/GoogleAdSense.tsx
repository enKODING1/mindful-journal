'use client';

import Script from 'next/script';

export default function GoogleAdSense() {
    const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

    if (!publisherId) {
        console.warn('Google AdSense Publisher ID가 설정되지 않았습니다.');
        return null;
    }

    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
