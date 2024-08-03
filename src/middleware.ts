import { NextRequest, NextResponse } from 'next/server';
import { PATH_AUTH, PATH_DASHBOARD, PATH_HOMEPAGE } from '@/app/routes/paths';

export function middleware(request: NextRequest) {
  const authorization = request.cookies.get('accessToken');
  const username = request.cookies.get('username');

  if (authorization && username) {
    // Continue with the request if the token and username is present
    if (request.nextUrl.pathname.includes('auth')) {
      const url = request.nextUrl.clone();
      url.pathname = PATH_DASHBOARD.todo;

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.rewrite(
    new URL(
      request.nextUrl.pathname === PATH_HOMEPAGE ? PATH_HOMEPAGE : PATH_AUTH.login,
      request.url
    )
  );
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
