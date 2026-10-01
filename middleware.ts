// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Pass the request to the Supabase utility to refresh cookies and handle redirects
  return await updateSession(request)
}

export const config = {
  // The matcher ensures middleware only runs on actual page routes, 
  // ignoring static files, images, and Next.js background data
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}