'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
                    Menu
                </label>
                {user ? (
                    <span>
                        <button onClick={handleLogout} className="btn btn-outline">
                            로그아웃
                        </button>
                    </span>
                ) : (
                    <></>
                )}
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
                        <Link href="/dashboard/home">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/info">Info</Link>
                    </li>
                    <li>
                        <Link href="/dashboard/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
