export default function Loading() {
    return (
        <div className="mt-16 max-w-2xl mx-auto px-4 flex flex-col gap-4">
            {/* 제목 Input */}
            <div className="h-12 w-full rounded-lg bg-base-300 animate-pulse" />

            {/* 본문 textarea */}
            <div className="rounded-2xl bg-base-200 p-6 flex flex-col gap-4">
                <div className="h-48 w-full rounded-lg bg-base-300 animate-pulse" />

                {/* 감정 선택 영역 */}
                <div className="flex gap-3 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full bg-base-300 animate-pulse" />
                    ))}
                </div>

                {/* 저장 버튼 */}
                <div className="h-12 w-full rounded-lg bg-base-300 animate-pulse" />
            </div>
        </div>
    );
}
