'use client';

import AdSenseAd from './AdSenseAd';

interface AdSenseBannerProps {
    className?: string;
}

export default function AdSenseBanner({ className = '' }: AdSenseBannerProps) {
    return (
        <div className={`w-full ${className}`}>
            <AdSenseAd
                adSlot="1234567890" // 실제 광고 슬롯 ID로 변경 필요
                adFormat="auto"
                responsive={true}
                className="w-full"
            />
        </div>
    );
}
