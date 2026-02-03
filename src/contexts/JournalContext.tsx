'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { Content } from '@/domain/models';
import createClient from '@/db/supabase/client';
import * as journalService from '@/services/journalService';
import { decryptText } from '@/lib/crypto';
import { getMasterKey } from '@/lib/useMasterKey';

const PAGE_SIZE = 7;

interface JournalContextType {
    journals: Content[];
    loading: boolean;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    getJournalById: (id: string) => Content | undefined;
    loadJournalById: (id: string) => Promise<Content | null>;
    refreshJournals: () => Promise<void>;
}

const JournalContext = createContext<JournalContextType | null>(null);

export function useJournals() {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error('useJournals must be used within a JournalProvider');
    }
    return context;
}

/**
 * 일기 내용 복호화
 */
async function decryptJournalContent(
    encryptedContent: string,
    cryptoKey: CryptoKey,
): Promise<string> {
    try {
        // JSON 형식인 경우 파싱 시도
        const parsed = JSON.parse(encryptedContent);
        if (parsed.iv && parsed.data) {
            return await decryptText(parsed, cryptoKey);
        }
        // 이미 평문인 경우 그대로 반환
        return encryptedContent;
    } catch {
        // JSON 파싱 실패 = 평문이거나 다른 형식
        // data만 있는 경우 (WriteClient에서 encryptedContent.data만 저장한 경우)
        // 이 경우 iv가 없어서 복호화 불가능 - 일단 그대로 반환
        return encryptedContent;
    }
}

/**
 * 일기 목록 복호화
 */
async function decryptJournals(journals: Content[], cryptoKey: CryptoKey): Promise<Content[]> {
    return Promise.all(
        journals.map(async (journal) => ({
            ...journal,
            content: await decryptJournalContent(journal.content, cryptoKey),
        })),
    );
}

interface JournalProviderProps {
    children: ReactNode;
    initialJournals?: Content[];
    initialHasMore?: boolean;
}

export function JournalProvider({
    children,
    initialJournals = [],
    initialHasMore = true,
}: JournalProviderProps) {
    const [journals, setJournals] = useState<Content[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [page, setPage] = useState(0);
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const supabase = createClient();

    // 마스터키 → CryptoKey 변환
    useEffect(() => {
        const initCryptoKey = async () => {
            const masterKey = getMasterKey();
            if (masterKey) {
                const key = await crypto.subtle.importKey(
                    'raw',
                    masterKey as BufferSource,
                    { name: 'AES-GCM' },
                    false,
                    ['decrypt'],
                );
                setCryptoKey(key);
            }
        };
        initCryptoKey();
    }, []);

    // 초기 데이터 복호화
    useEffect(() => {
        const initJournals = async () => {
            if (cryptoKey && initialJournals.length > 0 && !isInitialized) {
                const decrypted = await decryptJournals(initialJournals, cryptoKey);
                setJournals(decrypted);
                setIsInitialized(true);
            } else if (cryptoKey && initialJournals.length === 0) {
                setIsInitialized(true);
            }
        };
        initJournals();
    }, [cryptoKey, initialJournals, isInitialized]);

    // 더 불러오기
    const loadMore = useCallback(async () => {
        if (!hasMore || loading || !cryptoKey) return;

        setLoading(true);
        try {
            const nextPage = page + 1;
            const offset = nextPage * PAGE_SIZE;
            const data = await journalService.listJournalsByUser(supabase, PAGE_SIZE, offset);

            const decrypted = await decryptJournals(data, cryptoKey);

            setJournals((prev) => [...prev, ...decrypted]);
            setPage(nextPage);
            setHasMore(data.length === PAGE_SIZE);
        } catch (err) {
            console.error('Failed to load more journals:', err);
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading, page, supabase, cryptoKey]);

    // ID로 일기 찾기 (캐시된 데이터에서)
    const getJournalById = useCallback(
        (id: string) => {
            return journals.find((j) => j.id === id);
        },
        [journals],
    );

    // ID로 일기 로드 (DB에서)
    const loadJournalById = useCallback(
        async (id: string): Promise<Content | null> => {
            // 먼저 캐시 확인
            const cached = journals.find((j) => j.id === id);
            if (cached) return cached;

            if (!cryptoKey) return null;

            try {
                const journal = await journalService.getJournalById(supabase, id);
                if (journal) {
                    const decrypted = {
                        ...journal,
                        content: await decryptJournalContent(journal.content, cryptoKey),
                    };
                    // 캐시에 추가
                    setJournals((prev) => {
                        if (prev.find((j) => j.id === id)) return prev;
                        return [...prev, decrypted];
                    });
                    return decrypted;
                }
                return null;
            } catch (err) {
                console.error('Failed to load journal:', err);
                return null;
            }
        },
        [journals, supabase, cryptoKey],
    );

    // 일기 목록 새로고침
    const refreshJournals = useCallback(async () => {
        if (!cryptoKey) return;

        setLoading(true);
        try {
            const data = await journalService.listJournalsByUser(supabase, PAGE_SIZE, 0);
            const decrypted = await decryptJournals(data, cryptoKey);
            setJournals(decrypted);
            setPage(0);
            setHasMore(data.length === PAGE_SIZE);
        } catch (err) {
            console.error('Failed to refresh journals:', err);
        } finally {
            setLoading(false);
        }
    }, [supabase, cryptoKey]);

    // 초기화 전 로딩 표시
    if (!isInitialized && initialJournals.length > 0) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <JournalContext.Provider
            value={{
                journals,
                loading,
                hasMore,
                loadMore,
                getJournalById,
                loadJournalById,
                refreshJournals,
            }}
        >
            {children}
        </JournalContext.Provider>
    );
}
