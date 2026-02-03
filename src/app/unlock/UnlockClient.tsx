'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/atom/Container';
import Button from '@/components/ui/atom/Button';
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import createClient from '@/db/supabase/client';
import { deriveKey, decrypt, decryptText } from '@/lib/crypto';

export default function UnlockClient() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // 이미 마스터키가 있으면 홈으로 이동
    useEffect(() => {
        const masterKey = localStorage.getItem('masterKey');
        if (masterKey) {
            router.replace('/');
        }
    }, [router]);

    const handleUnlock = async () => {
        setError('');

        if (!password) {
            setError('비밀번호를 입력해주세요');
            return;
        }

        setLoading(true);

        try {
            // 1. 현재 사용자 정보 가져오기
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setError('로그인이 필요합니다');
                setLoading(false);
                return;
            }

            // 2. encryption_keys 테이블에서 사용자 정보 조회
            const { data: encData, error: fetchError } = await supabase
                .from('encryption_keys')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (fetchError || !encData) {
                setError('암호화 정보를 찾을 수 없습니다');
                setLoading(false);
                return;
            }

            // 3. Salt 복원
            const salt = Uint8Array.from(atob(encData.password_salt), (c) => c.charCodeAt(0));

            // 4. 비밀번호 → 암호화 키 생성
            const passwordKey = await deriveKey(password, salt);

            // 5. verification_token 복호화로 비밀번호 검증
            try {
                const decryptedToken = await decryptText(encData.verification_token, passwordKey);

                if (decryptedToken !== 'VALID_KEY_V1') {
                    setError('비밀번호가 올바르지 않습니다');
                    setLoading(false);
                    return;
                }
            } catch {
                setError('비밀번호가 올바르지 않습니다');
                setLoading(false);
                return;
            }

            // 6. 마스터키 복호화
            try {
                const masterKey = await decrypt(encData.encrypted_master_key, passwordKey);

                // 7. localStorage에 마스터키 저장
                const masterKeyBase64 = btoa(String.fromCharCode(...masterKey));
                localStorage.setItem('masterKey', masterKeyBase64);

                // 8. 홈으로 이동
                router.push('/');
            } catch {
                setError('마스터키 복호화에 실패했습니다');
                setLoading(false);
                return;
            }
        } catch (err) {
            console.error('Unlock error:', err);
            setError('오류가 발생했습니다');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading) {
            handleUnlock();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Container className="w-full max-w-md flex flex-col gap-6">
                {/* 아이콘 및 타이틀 */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <KeyRound className="w-10 h-10 text-primary" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">일기장 잠금 해제</h1>
                        <p className="text-base-content/70">
                            마음챙김 일기를 보려면
                            <br />
                            비밀번호를 입력해주세요.
                        </p>
                    </div>
                </div>

                {/* 비밀번호 입력 */}
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-base-content/70">비밀번호</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Lock className="w-5 h-5 text-base-content/50" />
                            </div>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="비밀번호를 입력하세요"
                                className="input input-bordered w-full pl-10 pr-10"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {isPasswordVisible ? (
                                    <EyeOff className="w-5 h-5 text-base-content/70" />
                                ) : (
                                    <Eye className="w-5 h-5 text-base-content/70" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <div className="bg-error/10 text-error p-3 rounded-lg text-sm w-full">
                        {error}
                    </div>
                )}

                {/* 잠금 해제 버튼 */}
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleUnlock}
                    disabled={loading}
                >
                    {loading ? '확인 중...' : '잠금 해제'}
                </Button>

                {/* 안내 메시지 */}
                <p className="text-center text-sm text-base-content/50">
                    비밀번호를 잊으셨나요?
                    <br />
                    안타깝게도 비밀번호를 복구할 수 없습니다.
                </p>
            </Container>
        </div>
    );
}
