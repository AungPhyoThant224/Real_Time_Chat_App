import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('user-role')?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    if (!token) return NextResponse.redirect(new URL('/login', request.url));
    return NextResponse.redirect(
      new URL(userRole === 'ADMIN' ? '/admin/dashboard' : '/chat', request.url)
    );
  }

  if (pathname.startsWith('/admin')) {
    if (!token || userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL(token ? '/chat' : '/login', request.url));
    }
  }

  if (pathname.startsWith('/chat')) {
    if (!token || userRole === 'ADMIN') {
      return NextResponse.redirect(new URL(token ? '/admin/dashboard' : '/login', request.url));
    }
  }
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(
      new URL(userRole === 'ADMIN' ? '/admin/dashboard' : '/chat', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};