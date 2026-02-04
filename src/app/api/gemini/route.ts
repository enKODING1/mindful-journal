import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

    try {
        const { prompt } = await req.json();
        // prompt가 객체일 경우 decryptedContent 추출
        const journalContent =
            typeof prompt === 'string'
                ? prompt
                : prompt?.decryptedContent || JSON.stringify(prompt);

        const fullPrompt = `공감적 동반자
        예시:
        일기: "오늘 실수했어요"
        답변: "실수를 알아차린 것만으로도 성장이에요. 내일은 더 나아질 거예요."
        일기: "${journalContent}"
        답변:`;
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(fullPrompt);
        const text = result.response.text();
        return NextResponse.json({ text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
