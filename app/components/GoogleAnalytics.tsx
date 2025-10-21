'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';

export default function GoogleAnalytics() {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!measurementId) {
        console.warn('Google Analytics Measurement ID가 설정되지 않았습니다.');
        return null;
    }

    return <GA gaId={measurementId} />;
}
