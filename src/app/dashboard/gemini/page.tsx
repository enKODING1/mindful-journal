'use client'; // 이 파일이 클라이언트 컴포넌트임을 명시합니다.

import { useState } from 'react';

export default function GeminiTest() {
    // 컴포넌트가 기억할 상태들을 정의합니다.
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    // 폼 제출(전송 버튼 클릭) 시 실행될 함수
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
        setLoading(true); // 로딩 상태 시작
        setResult(''); // 이전 결과 지우기

        try {
            // 우리가 만든 백엔드 API(/api/gemini)로 요청을 보냅니다.
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }), // 사용자가 입력한 prompt를 JSON 형태로 보냄
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data.text); // API로부터 받은 답변을 상태에 저장
        } catch (error) {
            console.error('Fetch error:', error);
            alert('에러가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-8">Next.js & Gemini AI 🚀</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Gemini에게 무엇이든 물어보세요..."
                    className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={loading || !prompt}
                >
                    {loading ? '생각 중...' : '전송'}
                </button>
            </form>

            {result && (
                <div className="mt-8 p-4 bg-gray-100 rounded-md w-full max-w-md">
                    <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </main>
    );
}
