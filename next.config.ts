import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 60 * 5, // 5분
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
};

export default nextConfig;
