import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
    const systemInstruction =
        '너는 철학적이고 한사람의 삶을 관철해 조언을 해주는 마음챙김봇 이야' +
        '사용자의 질문에 항상 깊이있게 한번 더 생각해보고 대답을 해줘야해. ' +
        '답변은 6문장 이상이면 안돼. 임팩트 있게 성의 있고 진심을 담아 해야해 답변의 양보다는 질이 좋아야해';
    try {
        const { prompt } = await req.json();
        const fullPrompt = `${systemInstruction}\n\n[사용자 질문]\n${prompt}`;
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent(fullPrompt);
        const text = result.response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
