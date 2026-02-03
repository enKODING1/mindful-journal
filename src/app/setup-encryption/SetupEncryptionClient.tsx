'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/atom/Container';
import Button from '@/components/ui/atom/Button';
import ProgressBar from '@/components/ui/atom/ProgressBar';
import {
    BookOpen,
    Shield,
    Lock,
    Sparkles,
    MessageCircle,
    Calendar,
    Eye,
    EyeOff,
} from 'lucide-react';
import createClient from '@/db/supabase/client';

type Step = 1 | 2 | 3;

export default function SetupEncryptionClient() {
    const [step, setStep] = useState<Step>(1);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleNext = () => {
        if (step < 3) {
            setStep((step + 1) as Step);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep((step - 1) as Step);
        }
    };

    const handleSubmit = async () => {
        setError('');

        // 유효성 검사
        if (password.length < 8 || password.length > 16) {
            setError('비밀번호는 8~16자리로 입력해주세요');
            return;
        }

        // if (!/^[a-zA-Z0-9]+$/.test(password)) {
        //     setError('영문과 숫자를 포함하여 입력해주세요');
        //     return;
        // }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다');
            return;
        }

        setLoading(true);

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setError('로그인이 필요합니다');
                return;
            }

            // encryption_keys 테이블에 저장
            const { error: insertError } = await supabase.from('encryption_keys').insert({
                user_id: user.id,
                encryption_key: password,
            });

            if (insertError) {
                setError('암호 저장에 실패했습니다');
                return;
            }

            router.push('/');
        } catch {
            setError('오류가 발생했습니다');
        } finally {
            setLoading(false);
        }
    };

    const progressValue = (step / 3) * 100;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <Container
                variant="base-100"
                padding="xl"
                gap="lg"
                rounded="2xl"
                centered={true}
                className="max-w-md w-full"
            >
                {/* Progress Bar */}
                <div className="w-full">
                    <ProgressBar value={progressValue} variant="primary" className="w-full" />
                    <p className="text-center text-sm text-base-content/50 mt-2">{step} / 3</p>
                </div>

                {/* Step 1: 서비스 소개 */}
                {step === 1 && (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">
                                마음챙김 일기에 오신 것을 환영합니다
                            </h1>
                            <p className="text-base-content/70">
                                매일의 생각과 감정을 기록하며
                                <br />
                                마음의 평화를 찾아보세요
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full text-left">
                            <div className="flex items-start gap-3 p-3 bg-base-200 rounded-xl">
                                <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">감정 기록</p>
                                    <p className="text-sm text-base-content/70">
                                        오늘의 감정을 이모지로 표현해보세요
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-base-200 rounded-xl">
                                <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">AI 피드백</p>
                                    <p className="text-sm text-base-content/70">
                                        따뜻한 AI가 당신의 일기에 공감해드려요
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-base-200 rounded-xl">
                                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">감정 캘린더</p>
                                    <p className="text-sm text-base-content/70">
                                        한 달간의 감정 변화를 한눈에 확인하세요
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                )}

                {/* Step 2: 보안 강점 설명 */}
                {step === 2 && (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                            <Shield className="w-8 h-8 text-success" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">당신만 읽을 수 있는 일기</h1>
                            <p className="text-base-content/70">
                                모든 일기는 암호화되어 저장됩니다
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full text-left">
                            <div className="flex items-start gap-3 p-3 bg-success/10 rounded-xl">
                                <Lock className="w-5 h-5 text-success mt-0.5" />
                                <div>
                                    <p className="font-medium">종단간 암호화</p>
                                    <p className="text-sm text-base-content/70">
                                        여러분이 설정한 암호로만 일기를 읽을 수 있어요. 서버
                                        관리자도 내용을 볼 수 없습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-warning/10 p-4 rounded-xl w-full">
                            <p className="text-warning text-sm font-medium mb-1">⚠️ 중요</p>
                            <p className="text-sm text-base-content/70">
                                암호를 분실하면 일기를 복구할 수 없습니다.
                                <br />
                                반드시 기억할 수 있는 암호를 설정해주세요.
                            </p>
                        </div>

                        <div className="flex gap-3 w-full">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="flex-1"
                                onClick={handleBack}
                            >
                                이전
                            </Button>
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1"
                                onClick={handleNext}
                            >
                                다음
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: 암호 설정 */}
                {step === 3 && (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">암호 설정</h1>
                            <p className="text-base-content/70">
                                일기를 보호할 8~16자리 숫자 암호를 설정해주세요
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">암호 (8~16자리 숫자)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        maxLength={16}
                                        placeholder="••••••"
                                        className="input input-bordered w-full text-center text-2xl tracking-widest"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">암호 확인</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        maxLength={16}
                                        placeholder="••••••"
                                        className="input input-bordered w-full text-center text-2xl tracking-widest"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        {isConfirmPasswordVisible ? (
                                            <EyeOff className="w-5 h-5 text-base-content/70" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-base-content/70" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-error/10 text-error p-3 rounded-lg text-sm w-full">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3 w-full">
                            <Button
                                variant="ghost"
                                size="lg"
                                className="flex-1"
                                onClick={handleBack}
                                disabled={loading}
                            >
                                이전
                            </Button>
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? '설정 중...' : '시작하기'}
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
