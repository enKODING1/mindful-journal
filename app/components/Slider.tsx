'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Info, User, Calendar, LogOut, Menu } from 'lucide-react';
import createClient from '../utils/supabase/client';

export default function Slider() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let isMounted = true;
        supabase.auth.getUser().then(({ data }) => {
            if (isMounted) setUser(data.user);
        });
        return () => {
            isMounted = false;
        };
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navigation Bar */}
                <div className="navbar bg-base-100 shadow-lg">
                    <div className="navbar-start">
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-ghost hover:bg-primary hover:text-primary-content transition-colors"
                        >
                            <Menu size={20} />
                            <span className="ml-2">메뉴</span>
                        </label>
                    </div>

                    <div className="navbar-end">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="btn btn-ghost hover:bg-error hover:text-error-content transition-colors"
                            >
                                <LogOut size={16} />
                                <span className="ml-2">로그아웃</span>
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link href="/dashboard/home" className="flex items-center gap-3">
                            <Home size={20} />
                            대시보드
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/info" className="flex items-center gap-3">
                            <Info size={20} />
                            정보
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/profile" className="flex items-center gap-3">
                            <User size={20} />
                            프로필
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/moodCalendar" className="flex items-center gap-3">
                            <Calendar size={20} />
                            기분 캘린더
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
