'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BookOpen,
    ChartBar,
    SlidersHorizontal,
    Calendar,
    Menu,
    SquarePen,
    LucideIcon,
} from 'lucide-react';

interface MenuItem {
    path: string;
    icon: LucideIcon;
    label: string;
    shortLabel: string;
}

const menuItems: MenuItem[] = [
    { path: '/write', icon: SquarePen, label: '일기 작성', shortLabel: '작성' },
    { path: '/', icon: BookOpen, label: '일기 목록', shortLabel: '목록' },
    { path: '/stat', icon: ChartBar, label: '통계', shortLabel: '통계' },
    { path: '/moodCalendar', icon: Calendar, label: '기분', shortLabel: '기분' },
    { path: '/setting', icon: SlidersHorizontal, label: '설정', shortLabel: '설정' },
];

export default function Slider() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname?.startsWith(path);
    };

    return (
        <>
            {/* 모바일: 상단 navbar (메뉴 버튼 없이 배경색만 유지) */}
            <div className="navbar bg-base-300 md:hidden"></div>

            {/* 데스크톱: Side Drawer (md 이상에서만 표시) */}
            <div className="hidden md:block">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className="navbar bg-base-300 shadow-lg">
                            <div className="navbar-start">
                                <label
                                    htmlFor="my-drawer"
                                    className="btn btn-ghost hover:bg-primary hover:text-primary-content transition-colors"
                                >
                                    <Menu size={20} />
                                    <span className="ml-2">메뉴</span>
                                </label>
                            </div>
                            <div className="navbar-end"></div>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 ${isActive(item.path) ? 'active' : ''}`}
                                    >
                                        <item.icon size={15} />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 모바일: Bottom Navigator (md 미만에서만 표시) */}
            <div className="dock md:hidden">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={isActive(item.path) ? 'dock-active' : ''}
                    >
                        <item.icon size={20} />
                        <span className="dock-label">{item.shortLabel}</span>
                    </Link>
                ))}
            </div>
        </>
    );
}
