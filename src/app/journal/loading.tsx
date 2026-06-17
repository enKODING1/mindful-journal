export default function Loading() {
    return (
        <div className="mt-10 flex flex-col gap-6">
            {/* 일기 카드 skeleton 여러 개 */}
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="mx-auto max-w-2xl w-full rounded-2xl bg-base-100 p-6 flex flex-col gap-4"
                >
                    {/* 날짜 + 감정 아이콘 */}
                    <div className="flex items-center justify-between">
                        <div className="h-4 w-28 rounded bg-base-300 animate-pulse" />
                        <div className="h-8 w-8 rounded-full bg-base-300 animate-pulse" />
                    </div>
                    {/* 제목 */}
                    <div className="h-6 w-3/4 rounded bg-base-300 animate-pulse" />
                    {/* 본문 미리보기 */}
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-full rounded bg-base-300 animate-pulse" />
                        <div className="h-4 w-5/6 rounded bg-base-300 animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}
