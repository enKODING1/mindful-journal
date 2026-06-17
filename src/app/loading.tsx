export default function Loading() {
    return (
        <div className="flex flex-col bg-base-100 max-w-2xl mx-auto rounded-2xl p-8 gap-6 mt-10">
            {/* 제목 "내 일기" */}
            <div className="h-9 w-24 rounded bg-base-300 animate-pulse" />

            {/* 월별 그룹 */}
            <div className="flex flex-col gap-6">
                {/* 월 헤더 */}
                <div className="h-7 w-28 rounded bg-base-300 animate-pulse" />

                {/* JournalCard skeleton 리스트 */}
                <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-5 bg-base-200 rounded-xl flex flex-col gap-3">
                            {/* 상단: 날짜 & 기분 */}
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-16 rounded bg-base-300 animate-pulse" />
                                <div className="flex items-center gap-1.5">
                                    <div className="h-4 w-4 rounded-full bg-base-300 animate-pulse" />
                                    <div className="h-3 w-10 rounded bg-base-300 animate-pulse" />
                                </div>
                            </div>
                            {/* 제목 */}
                            <div className="h-5 w-3/4 rounded bg-base-300 animate-pulse" />
                            {/* 미리보기 */}
                            <div className="flex flex-col gap-1.5">
                                <div className="h-4 w-full rounded bg-base-300 animate-pulse" />
                                <div className="h-4 w-5/6 rounded bg-base-300 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
