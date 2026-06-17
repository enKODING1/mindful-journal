export default function Loading() {
    return (
        <div className="flex flex-col bg-base-100 max-w-2xl mx-auto rounded-2xl p-8 gap-8">
            {/* PeriodTab skeleton — flex-row 3개 버튼, Container padding=none gap=xs rounded=xl */}
            <div className="flex gap-2 rounded-xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 flex-1 rounded-lg bg-base-300 animate-pulse" />
                ))}
            </div>

            {/* JournalStats — grid grid-cols-2 sm:grid-cols-4 gap-4, StatCard size=xs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="card bg-base-200 rounded-2xl">
                        <div className="card-body items-center text-center gap-2 p-6">
                            <div className="h-10 w-10 rounded bg-base-300 animate-pulse" />
                            <div className="h-4 w-16 rounded bg-base-300 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            {/* MoodDistribution — Container padding=none gap=md rounded=2xl */}
            <div className="flex flex-col gap-4">
                {/* 제목 */}
                <div className="h-6 w-20 rounded bg-base-300 animate-pulse" />

                {/* 감정 행 5개: emoji(30x30) + label(w-12) + ProgressBar(flex-1) + count(w-20) */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-[30px] h-[30px] rounded-full bg-base-300 animate-pulse shrink-0" />
                        <div className="h-4 w-12 rounded bg-base-300 animate-pulse shrink-0" />
                        <div className="flex-1 h-2 rounded-full bg-base-300 animate-pulse" />
                        <div className="h-4 w-20 rounded bg-base-300 animate-pulse shrink-0" />
                    </div>
                ))}
            </div>

            {/* MonthlyTrend — Container padding=none gap=md rounded=2xl */}
            <div className="flex flex-col gap-4">
                {/* 제목 */}
                <div className="h-6 w-20 rounded bg-base-300 animate-pulse" />

                {/* TrendBar 행 3개: label(w-16) + ProgressBar(flex-1) + count(w-16) */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 w-full">
                        <div className="h-4 w-16 rounded bg-base-300 animate-pulse shrink-0" />
                        <div className="flex-1 h-2 rounded-full bg-base-300 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-base-300 animate-pulse shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}
