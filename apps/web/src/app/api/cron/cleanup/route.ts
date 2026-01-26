import { NextResponse } from "next/server";
import { cleanupExpiredForms } from "@/lib/form-storage";

export async function GET(request: Request) {
  // Protection using Authorization header (standard for Vercel Cron)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || process.env.CLEANUP_TOKEN;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
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
