export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 flex flex-col items-center gap-6">
                {/* 아이콘 */}
                <div className="w-20 h-20 rounded-full bg-base-300 animate-pulse" />

                {/* 제목 + 설명 */}
                <div className="flex flex-col items-center gap-2 w-full">
                    <div className="h-7 w-40 rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-48 rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-40 rounded bg-base-300 animate-pulse" />
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="w-full flex flex-col gap-2">
                    <div className="h-4 w-16 rounded bg-base-300 animate-pulse" />
                    <div className="h-12 w-full rounded-lg bg-base-300 animate-pulse" />
                </div>

                {/* 잠금 해제 버튼 */}
                <div className="h-12 w-full rounded-lg bg-base-300 animate-pulse" />

                {/* 안내 텍스트 */}
                <div className="flex flex-col items-center gap-1">
                    <div className="h-3 w-36 rounded bg-base-300 animate-pulse" />
                    <div className="h-3 w-52 rounded bg-base-300 animate-pulse" />
                </div>
            </div>
        </div>
    );
}
