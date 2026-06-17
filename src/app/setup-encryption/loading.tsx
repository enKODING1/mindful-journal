export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md w-full rounded-2xl bg-base-100 p-8 flex flex-col items-center gap-6">
                {/* Progress bar */}
                <div className="w-full flex flex-col gap-2">
                    <div className="h-2 w-full rounded-full bg-base-300 animate-pulse" />
                    <div className="h-3 w-8 rounded bg-base-300 animate-pulse mx-auto" />
                </div>

                {/* 아이콘 */}
                <div className="w-16 h-16 rounded-full bg-base-300 animate-pulse" />

                {/* 제목 + 설명 */}
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="h-7 w-64 rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-48 rounded bg-base-300 animate-pulse" />
                </div>

                {/* Feature 카드 3개 */}
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="w-full flex items-start gap-3 p-3 bg-base-200 rounded-xl"
                    >
                        <div className="w-5 h-5 rounded bg-base-300 animate-pulse shrink-0 mt-0.5" />
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="h-4 w-20 rounded bg-base-300 animate-pulse" />
                            <div className="h-3 w-full rounded bg-base-300 animate-pulse" />
                        </div>
                    </div>
                ))}

                {/* 버튼 */}
                <div className="h-12 w-full rounded-lg bg-base-300 animate-pulse" />
            </div>
        </div>
    );
}
