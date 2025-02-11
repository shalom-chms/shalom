import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/_next', '/api', '/static']
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath))

  // Allow all public paths without any redirects
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check for authentication
  const token = request.cookies.get('__firebase_auth_token')?.value

  // Redirect unauthenticated users to login
  if (!token && path !== '/login') {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
