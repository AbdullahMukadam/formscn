import { AI_SCHEMA_GENERATION_PROMPT } from "@/constants/ai-service";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.FREETHEAI_API_KEY,
  baseURL: "https://api.freetheai.xyz/v1",
});

function extractSchema(raw: string): string {
  let cleaned = raw
    .replace(/```(?:typescript|ts|javascript|js|zod)?\n?/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("z.object(");
  if (start === -1) throw new Error("AI did not return a valid z.object() schema");

  let braceCount = 0;
  let i = cleaned.indexOf("{", start);

  for (; i < cleaned.length; i++) {
    if (cleaned[i] === "{") braceCount++;
    else if (cleaned[i] === "}") {
      braceCount--;
      if (braceCount === 0) break;
    }
  }

  const end = cleaned.indexOf(")", i) + 1;
  return cleaned.substring(start, end).trim();
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Please enter a prompt" }, { status: 400 });
  }

  try {
    const result = await client.chat.completions.create({
      model: "yng/gemini-3-1-pro",
      messages: [
        { role: "user", content: AI_SCHEMA_GENERATION_PROMPT + prompt },
      ],
    });

    const raw = result.choices[0].message.content ?? "";
    const schema = extractSchema(raw);

    return NextResponse.json({ schema });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server Error" },
      { status: 500 }
    );
  }
}