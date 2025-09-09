import Link from 'next/link';
import { Content } from './types';

export default function Home({ contents }: { contents: Content[] }) {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-600">홈</h2>
            <p className="text-gray-600 mb-4">마음챙김 저널에 오신 것을 환영합니다.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-600">최근 기록</h3>
                <p className="text-sm text-gray-600">
                    아직 기록이 없습니다. 새로운 저널을 시작해보세요!
                </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
                {contents.map((content) => (
                    <div key={content.id} className="card w-96 bg-base-100 card-xs shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">{content.created_at}</h2>
                            <p>{content.content}</p>
                            <p>{content.mood}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Link href="/write" className="btn btn-primary mt-4 ">
                작성하기
            </Link>
        </div>
    );
}
