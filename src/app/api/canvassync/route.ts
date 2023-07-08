import { syncWithCanvas } from '@/lib/Canvas/CanvasSync';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const canvasKey = request.headers.get("Authorization") ?? searchParams.get("canvas_token");
  const includeCompletedAssignments = searchParams.get("includeCompletedAssignments") == 'true';
  const includeConcludedCourses = searchParams.get("includeConcludedCourses") == 'true';
  const startDateInfo = searchParams.get("start");
  const startDate = startDateInfo ? new Date(startDateInfo ?? 0) : undefined;
  if (!canvasKey) {
    return NextResponse.json(
      { error: "Canvas token not given in Authorization header" },
      { status: 401 }
    )
  }
  const canvasKeyDetails = canvasKey.split(" ");
  const res = await syncWithCanvas(canvasKeyDetails[1], includeConcludedCourses, includeCompletedAssignments, startDate)
  if (res.error) {
    return NextResponse.json(
      { error: "Canvas token given in Authorization header is invalid" },
      { status: 401 }
    )
  }
  return NextResponse.json(res)
}