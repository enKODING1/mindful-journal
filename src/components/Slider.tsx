'use client';
import Link from 'next/link';
import { BookOpen, ChartBar, SlidersHorizontal, Calendar, Menu, SquarePen } from 'lucide-react';

export default function Slider() {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navigation Bar */}
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
                    {/* Sidebar content here */}
                    <li>
                        <Link href="/write" className="flex items-center gap-3">
                            <SquarePen size={15} />
                            일기 작성
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex items-center gap-3">
                            <BookOpen size={15} />
                            일기 목록
                        </Link>
                    </li>
                    <li>
                        <Link href="/stat" className="flex items-center gap-3">
                            <ChartBar size={15} />
                            통계
                        </Link>
                    </li>
                    <li>
                        <Link href="/moodCalendar" className="flex items-center gap-3">
                            <Calendar size={15} />
                            기분
                        </Link>
                    </li>
                    <li>
                        <Link href="/setting" className="flex items-center gap-3">
                            <SlidersHorizontal size={15} />
                            설정
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
