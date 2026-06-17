export default function Loading() {
    return (
        <div className="mt-10 mx-auto max-w-lg rounded-2xl bg-base-100 p-8 flex flex-col gap-6">
            {/* 프로필 섹션 skeleton */}
            <section className="flex items-center gap-6">
                {/* 아바타 */}
                <div className="w-20 h-20 rounded-full bg-base-300 animate-pulse shrink-0" />

                {/* 이름 / 이메일 */}
                <div className="flex-1 flex flex-col gap-2">
                    <div className="h-5 w-32 rounded bg-base-300 animate-pulse" />
                    <div className="h-4 w-48 rounded bg-base-300 animate-pulse" />
                </div>
            </section>

            {/* 구분선 */}
            <div className="divider my-0" />

            {/* 버튼 skeleton */}
            <section className="flex flex-col gap-2">
                <div className="h-11 w-full rounded-lg bg-base-300 animate-pulse" />
            </section>
        </div>
    );
}
