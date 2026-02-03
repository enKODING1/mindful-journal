'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// 마스터키 체크가 필요 없는 경로들
const PUBLIC_PATHS = ['/login', '/setup-encryption', '/unlock'];

interface MasterKeyContextType {
    hasMasterKey: boolean;
    clearMasterKey: () => void;
}

const MasterKeyContext = createContext<MasterKeyContextType>({
    hasMasterKey: false,
    clearMasterKey: () => {},
});

export function useMasterKey() {
    return useContext(MasterKeyContext);
}

export function MasterKeyProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecked, setIsChecked] = useState(false);
    const [hasMasterKey, setHasMasterKey] = useState(false);

    useEffect(() => {
        // 공개 경로는 체크하지 않고 바로 표시
        if (PUBLIC_PATHS.some((path) => pathname?.startsWith(path))) {
            setIsChecked(true);
            return;
        }

        const masterKey = localStorage.getItem('masterKey');
        if (!masterKey) {
            router.replace('/unlock');
        } else {
            setHasMasterKey(true);
            setIsChecked(true);
        }
    }, [pathname, router]);

    const clearMasterKey = () => {
        localStorage.removeItem('masterKey');
        setHasMasterKey(false);
        router.replace('/unlock');
    };

    // 체크 완료 전에는 로딩 표시
    if (!isChecked) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <MasterKeyContext.Provider value={{ hasMasterKey, clearMasterKey }}>
            {children}
        </MasterKeyContext.Provider>
    );
}

/**
 * localStorage에서 마스터키 가져오기
 */
export function getMasterKey(): Uint8Array | null {
    if (typeof window === 'undefined') return null;

    const keyBase64 = localStorage.getItem('masterKey');
    if (!keyBase64) return null;

    return Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));
}
