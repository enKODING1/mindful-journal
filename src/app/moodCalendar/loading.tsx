export default function Loading() {
    return (
        <div className="flex flex-col bg-base-100 max-w-2xl mx-auto rounded-2xl p-8 gap-6 mt-10">
            {/* 제목 + 설명 */}
            <div className="h-7 w-28 rounded bg-base-300 animate-pulse" />
            <div className="h-4 w-56 rounded bg-base-300 animate-pulse" />

            {/* 캘린더 skeleton */}
            <div className="w-full aspect-[7/5] rounded-xl bg-base-300 animate-pulse" />
        </div>
    );
}
