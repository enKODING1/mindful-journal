'use client';

import { useEffect } from 'react';

// AdSense 전역 타입 정의
declare global {
    interface Window {
        adsbygoogle: Array<Record<string, unknown>>;
    }
}

interface AdSenseAdProps {
    adSlot: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    adStyle?: React.CSSProperties;
    className?: string;
    responsive?: boolean;
}

export default function AdSenseAd({
    adSlot,
    adFormat = 'auto',
    adStyle = { display: 'block' },
    className = '',
    responsive = true,
}: AdSenseAdProps) {
    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('AdSense 광고 로드 오류:', error);
        }
    }, []);

    const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

    if (!publisherId) {
        return (
            <div
                className={`bg-gray-100 border border-gray-300 p-4 text-center text-gray-500 ${className}`}
            >
                AdSense 광고 (Publisher ID 필요)
            </div>
        );
    }

    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={adStyle}
            data-ad-client={`ca-pub-${publisherId}`}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={responsive ? 'true' : 'false'}
        />
    );
}
