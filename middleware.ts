import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const routesPrivees = ['/dashboard', '/profil', '/messages']
const routesPubliques = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si la route est privée
  const estPrivee = routesPrivees.some(route => pathname.startsWith(route))
  const estPublique = routesPubliques.some(route => pathname.startsWith(route))

  // Récupérer le token Supabase
  const token = request.cookies.get('sb-access-token')?.value ||
    request.cookies.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`)?.value

  // Rediriger vers login si route privée sans token
  if (estPrivee && !token) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Rediriger vers dashboard si déjà connecté et tente d'accéder login/register
  if (estPublique && token) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profil/:path*',
    '/messages/:path*',
    '/login',
    '/register'
  ]
}