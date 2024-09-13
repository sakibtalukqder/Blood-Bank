import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(

    function middleware(request) {

        // console.log(request.nextauth.token);

        const USER = request.nextauth.token

        const VISITOR = USER?.role === 'VISITOR'
        const CONTRIBUTOR = USER?.role === 'CONTRIBUTOR'
        const ADMIN = USER?.role === 'ADMIN'

        if (request.nextUrl.pathname.startsWith('/doner/register') && (!USER)) {
            return NextResponse.rewrite(new URL('/signup', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/doner/approval') && (VISITOR)) {
            return NextResponse.rewrite(new URL('/access-denide', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/admin') && (!ADMIN)) {
            return NextResponse.rewrite(new URL('/access-denide', request.url))
        }
        

    },

    {
        callbacks: {
            authorized: async ({ req, token }) => {
                if (!token) return false
            }
        },
        secret: process.env.JWT_SECRET,
    },
)

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/doner/register/:path*',
        '/doner/approval/:path*',
        '/UserProfile',
        '/admin/:path*'
    ]
}
