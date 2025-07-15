import { getApiKeyFromType } from "@repo/ai/openai/baseServer";
import OpenAI from "openai";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const audioFile = formData.get("file");

        if (!audioFile || !(audioFile instanceof Blob)) {
        return NextResponse.json({ error: "Invalid or missing audio file" }, { status: 400 });
        }
        const apiKey = await getApiKeyFromType('OpenAI');
        
        const openai = new OpenAI({ apiKey });

        const transcription = await openai.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-1'
        });
        console.log("Transcription response:", transcription);

        return NextResponse.json({ text: transcription.text });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}