import { getSearchDocs } from "@/lib/search";
import { NextResponse } from "next/server";

let cached: ReturnType<typeof getSearchDocs> | null = null;

export async function GET() {
  if (!cached) cached = getSearchDocs();
  return NextResponse.json(cached);
}
