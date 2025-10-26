'use client';
import { useState, useEffect } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { Content, Profile as ProfileType, ProfileFormData } from './types';
import createClient from '@/app/utils/supabase/client';

export default function Profile({ contents }: { contents: Content[] }) {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<ProfileFormData>({ alias: '', email: '', bio: '' });
    const [saving, setSaving] = useState(false);
    const contentLength = contents.length;

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();

            // 현재 로그인한 사용자 정보 가져오기
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error('User not authenticated:', userError);
                setLoading(false);
                return;
            }

            // 사용자 ID로 프로필 조회
            console.log(user.id);
            const { data, error } = await supabase.from('profiles').select('*').single();
            // console.log('fetched:', data);

            if (error) {
                console.error('Profile fetch error:', error);
                if (error.code === 'PGRST116') {
                    const { data, error } = await supabase.from('profiles').insert({
                        user_id: user.id,
                        email: user.email,
                        alias: 'anonymous',
                    });

                    if (error) {
                        console.error('Error insert:', error);
                    } else {
                        console.log('temp info generator success!', data);
                    }

                    const res = await supabase.from('profiles').select('*').single();
                    if (error) {
                        console.error('Error', res.error);
                    } else {
                        console.log('Success:', res.data);
                        setProfile(res.data);
                    }
                }
            } else {
                setProfile(data);
                setEditForm({
                    alias: data?.alias || '',
                    email: data?.email || '',
                    bio: data?.bio || '',
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleEdit = () => {
        setEditForm({
            alias: profile?.alias || '',
            email: profile?.email || '',
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditForm({
            alias: profile?.alias || '',
            email: profile?.email || '',
        });
    };

    const handleSave = async () => {
        setSaving(true);
        const supabase = createClient();

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;

            const updatePayload = {
                alias: editForm.alias,
                email: editForm.email,
            };

            const { data, error } = await supabase
                .from('profiles')
                .update(updatePayload)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) {
                console.error('프로필 업데이트 에러:', error);
                alert('프로필 저장에 실패했습니다.');
            } else {
                setProfile(data);
                setIsEditing(false);
                alert('프로필이 성공적으로 저장되었습니다!');
            }
        } catch (error) {
            console.error('저장 중 오류:', error);
            alert('저장 중 오류가 발생했습니다.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">프로필</h2>
                {!isEditing && (
                    <button onClick={handleEdit} className="btn btn-primary btn-sm">
                        <Edit3 size={16} />
                        <span className="ml-1">편집</span>
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">사용자 정보</h3>
                        {isEditing && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="btn btn-success btn-sm"
                                >
                                    <Save size={14} />
                                    <span className="ml-1">{saving ? '저장 중...' : '저장'}</span>
                                </button>
                                <button onClick={handleCancel} className="btn btn-outline btn-sm">
                                    <X size={14} />
                                    <span className="ml-1">취소</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="space-y-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">이름</span>
                                </label>
                                <input
                                    type="text"
                                    value={editForm.alias}
                                    onChange={(e) =>
                                        setEditForm({ ...editForm, alias: e.target.value })
                                    }
                                    className="input input-bordered"
                                    placeholder="이름을 입력하세요"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">이메일</span>
                                </label>
                                <span>{profile?.email}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                <p>
                                    가입일:{' '}
                                    {profile?.created_at
                                        ? new Date(profile.created_at).toLocaleDateString('ko-KR')
                                        : '알 수 없음'}
                                </p>
                                <p>총 저널 수: {contentLength}개</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="text-sm text-gray-600 dark:text-gray-200">
                                <p>
                                    <span className="font-medium">이름:</span>{' '}
                                    {profile?.alias || '설정되지 않음'}
                                </p>
                                <p>
                                    <span className="font-medium">이메일:</span>{' '}
                                    {profile?.email || '설정되지 않음'}
                                </p>

                                <p>
                                    <span className="font-medium">가입일:</span>{' '}
                                    {profile?.created_at
                                        ? new Date(profile.created_at).toLocaleDateString('ko-KR')
                                        : '알 수 없음'}
                                </p>
                                <p>
                                    <span className="font-medium">총 저널 수:</span> {contentLength}
                                    개
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">설정</h3>
                    <div className="space-y-2">
                        <button className="btn btn-ghost btn-sm justify-start text-blue-600 hover:text-blue-800">
                            알림 설정
                        </button>
                        <button className="btn btn-ghost btn-sm justify-start text-blue-600 hover:text-blue-800">
                            데이터 내보내기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
