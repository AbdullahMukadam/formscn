import { NextResponse } from "next/server";
import { saveForm } from "@/lib/form-storage";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, code, config, dependencies } = body;

    if (!name || !code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const id = nanoid(10); // Generate a short, unique ID
    
    await saveForm({
      id,
      name,
      description: description || "",
      code,
      config: config || {},
      dependencies: dependencies || [],
    });

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to publish form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
