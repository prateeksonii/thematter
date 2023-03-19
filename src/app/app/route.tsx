import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/app/projects";
  return NextResponse.redirect(url);
}
