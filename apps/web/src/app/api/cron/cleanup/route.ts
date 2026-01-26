import { NextResponse } from "next/server";
import { cleanupExpiredForms } from "@/lib/form-storage";

export async function GET(request: Request) {
  // Simple protection using a secret token if available
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  
  if (process.env.CLEANUP_TOKEN && token !== process.env.CLEANUP_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await cleanupExpiredForms();
    return NextResponse.json({ 
      success: true, 
      message: `Cleaned up ${result?.count || 0} expired forms.`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Cleanup failed" 
    }, { status: 500 });
  }
}
