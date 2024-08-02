import { NextRequest, NextResponse } from 'next/server';

import { PATH_AUTH, PATH_DASHBOARD } from '@/app/routes/paths';

export function middleware(request: NextRequest) {
  const authorization = request.cookies.get('accessToken');
  const username = request.cookies.get('username');

  //   Check if the token and username is exist
  if (authorization && username) {
    // Continue with the request if the token and username is present
    if (request.nextUrl.pathname.includes('auth')) {
      const url = request.nextUrl.clone();
      url.pathname = PATH_DASHBOARD.todo;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  //   Redirect to login page if the token and username is missing
  const url = request.nextUrl.clone();
  url.pathname = PATH_AUTH.login;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
};
