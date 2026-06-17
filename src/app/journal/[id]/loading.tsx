export default function Loading() {
    return (
        <article className="max-w-2xl mx-auto px-4 py-8 mt-10">
            {/* 뒤로가기 버튼 */}
            <div className="h-8 w-24 rounded-lg bg-base-300 animate-pulse mb-8" />

            {/* 헤더 영역 */}
            <header className="mb-10">
                {/* 제목 */}
                <div className="h-8 w-4/5 rounded bg-base-300 animate-pulse mb-4" />

                {/* 메타 정보: 날짜 · 기분 */}
                <div className="flex items-center gap-4">
                    <div className="h-4 w-36 rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-1 rounded bg-base-300 animate-pulse" />
                    <div className="flex items-center gap-1.5">
                        <div className="h-[18px] w-[18px] rounded-full bg-base-300 animate-pulse" />
                        <div className="h-4 w-12 rounded bg-base-300 animate-pulse" />
                    </div>
                </div>
            </header>

            {/* 본문 */}
            <section className="flex flex-col gap-3">
                <div className="h-5 w-full rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-full rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-11/12 rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-full rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-full rounded bg-base-300 animate-pulse" />
                <div className="h-5 w-5/6 rounded bg-base-300 animate-pulse" />
            </section>

            {/* AI 피드백 */}
            <aside className="mt-16 pt-8 border-t border-base-200">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-4 w-4 rounded bg-base-300 animate-pulse" />
                    <div className="h-3 w-24 rounded bg-base-300 animate-pulse" />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-full rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-full rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-2/3 rounded bg-base-300 animate-pulse" />
                </div>
            </aside>
        </article>
    );
}
