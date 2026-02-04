'use client';

import Image from 'next/image';
import Container from '@/components/ui/atom/Container';
import type { Profile } from '@/domain/models';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface SettingClientProps {
    profile: Profile;
}

export default function SettingClient({ profile }: SettingClientProps) {
    const router = useRouter();
    const { logout, error } = useAuth();
    // 기본 아바타 URL (없을 경우)
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.alias || 'User')}&background=random&size=128`;

    const handleLogout = async () => {
        await logout();
        if (!error) {
            localStorage.removeItem('masterKey');
            router.push('/login');
        }
    };

    return (
        <Container className="mt-10" variant="base-300" padding="xl" gap="lg" rounded="2xl">
            {/* 프로필 섹션 */}
            <section className="flex items-center gap-6">
                {/* 아바타 */}
                <div className="relative">
                    <Image
                        src={profile.avatar_url || defaultAvatar}
                        alt="프로필 사진"
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                    />
                </div>

                {/* 프로필 정보 */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-base-content truncate">
                        {profile.alias || '익명'}
                    </h2>
                    <p className="text-sm text-base-content/60 truncate">
                        {profile.email || '이메일 없음'}
                    </p>
                </div>
            </section>

            {/* 구분선 */}
            {/* <div className="divider my-2"></div> */}

            {/* 설정 메뉴 */}
            {/* <section className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-base-content mb-2">설정</h3>

                <SettingItem label="프로필 편집" />
                <SettingItem label="알림 설정" />
                <SettingItem label="보안" />
                <SettingItem label="도움말" />
            </section> */}

            {/* 구분선 */}
            <div className="divider my-2"></div>

            {/* 계정 관련 */}
            <section className="flex flex-col gap-2">
                <SettingItem label="로그아웃" variant="danger" onClick={handleLogout} />
            </section>
        </Container>
    );
}

interface SettingItemProps {
    label: string;
    variant?: 'default' | 'danger';
    onClick?: () => void;
}

function SettingItem({ label, variant = 'default', onClick }: SettingItemProps) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full text-left px-4 py-3 rounded-lg
                transition-colors duration-200
                ${
                    variant === 'danger'
                        ? 'text-error hover:bg-error/10'
                        : 'text-base-content hover:bg-base-200'
                }
            `}
        >
            {label}
        </button>
    );
}
