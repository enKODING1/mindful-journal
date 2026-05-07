'use client';

import { useEffect, useState } from 'react';

function detectWebView(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent;

    const isAndroidWebView = /wv/.test(ua) && /Android/.test(ua);
    const isIOSWebView =
        /iPhone|iPad|iPod/.test(ua) && /AppleWebKit/.test(ua) && !/Safari/.test(ua);
    const isKnownInAppBrowser = /Instagram|FBAN|FBAV|ThreadsApp|Line|KakaoTalk|KAKAOTALK/.test(ua);

    return isAndroidWebView || isIOSWebView || isKnownInAppBrowser;
}

export function useWebViewDetect() {
    const [isWebView, setIsWebView] = useState(false);
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        setIsWebView(detectWebView());
        setIsAndroid(/Android/.test(navigator.userAgent));
    }, []);

    const openInExternalBrowser = () => {
        const currentUrl = window.location.href;
        if (/Android/.test(navigator.userAgent)) {
            // Android: Chrome Intent URL로 강제 오픈
            window.location.href = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } else {
            // iOS: 클립보드 복사 후 안내
            navigator.clipboard?.writeText(currentUrl);
        }
    };

    return { isWebView, isAndroid, openInExternalBrowser };
}
