import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['en', 'zh'];
const DEFAULT_LANG = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, studio, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/studio') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/models') ||
    pathname.match(/\.\w+$/) // static files (.png, .ico, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported lang prefix
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (SUPPORTED_LANGS.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Redirect to default lang prefix
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|studio|projects|models|.*\\..*).*)'],
};
