export default function Info() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">정보</h2>
            <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">마음챙김이란?</h3>
                    <p className="text-sm text-gray-600">
                        현재 순간에 주의를 기울이고, 판단하지 않으며, 의도적으로 인식하는 것입니다.
                    </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">저널 작성 팁</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 매일 일정한 시간에 작성하기</li>
                        <li>• 솔직하고 진실된 마음으로 쓰기</li>
                        <li>• 작은 변화도 기록하기</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
