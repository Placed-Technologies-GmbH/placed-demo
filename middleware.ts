import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    // Default to English, or use Accept-Language header for smarter detection
    return NextResponse.redirect(new URL('/en', request.url));
  }
  return NextResponse.next();
}