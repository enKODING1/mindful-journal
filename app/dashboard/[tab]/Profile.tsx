import { Content } from './types';

export default function Profile({ contents }: { contents: Content[] }) {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">프로필</h2>
            <div className="space-y-4">
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">사용자 정보</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                        <p>이름: 사용자</p>
                        <p>가입일: 2024년 1월</p>
                        <p>총 저널 수: 0개</p>
                    </div>
                </div>
                <div className="bg-base-200 text-base-content p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">설정</h3>
                    <div className="space-y-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                            알림 설정
                        </button>
                        <br />
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                            데이터 내보내기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
