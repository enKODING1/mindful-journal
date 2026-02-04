import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

    try {
        const { prompt, mood } = await req.json();

        const journalContent =
            typeof prompt === 'string'
                ? prompt
                : prompt?.decryptedContent || JSON.stringify(prompt);

        const fullPrompt = `공감적 마음챙김 동반자
            역할: 감정 이해, 위로, 응원
            답변: 3-5문장, 따뜻하게

            예시:
            일기: "오늘 실수했어요"
            기분: 우울함
            답변: "실수를 알아차린 것만으로도 성장이에요. 우울한 마음도 자연스러워요. 내일은 더 나아질 거예요."

            [오늘의 일기]
            ${journalContent}

            [기분 상태]
            ${mood || '기록 안 됨'}

            답변:`;
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(fullPrompt);
        const text = result.response.text();

        return NextResponse.json({ text });
    } catch (error: unknown) {
        console.error('Gemini API Error:', error);
        const apiError = error as Error & { status?: number };
        if (apiError.status === 429) {
            return NextResponse.json(
                { error: '사용량이 많아 잠시 쉬고 있어요. 1분 뒤에 다시 시도해주세요.' },
                { status: 429 },
            );
        }

        if (apiError.message?.includes('429') || apiError.message?.includes('Resource exhausted')) {
            return NextResponse.json(
                { error: '사용량이 많아 잠시 쉬고 있어요. 1분 뒤에 다시 시도해주세요.' },
                { status: 429 },
            );
        }

        return NextResponse.json(
            { error: 'AI가 답변을 생각하는 중에 오류가 났어요.' },
            { status: 500 },
        );
    }
}
