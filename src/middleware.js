
//next me middleware edge pr chalta
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    // console.log("Request object:", request);
    // Request object: {
    //     cookies: RequestCookies {"token":{"name":"token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTRkZTM0Y2NjOTZkYmExNWZiNDgwMSIsInVzZXJuYW1lIjoiYW1hbiIsImVtYWlsIjoiYW1hbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MTI2NDU5NjgsImV4cCI6MTcxMjczMjM2OH0.swLt6XAVz_0Hp5znIqHEZWchgi52VkSaWrIrQS3LPzg"}},
    const path = request.nextUrl.pathname
    // console.log("path in middleware", path)

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'  //these are public path

    //if user login then again not login
    //login check ke liye token check
    const token = request.cookies.get("token")?.value || ''

    if (isPublicPath && token) {//agar token hain hai public patha hai login signup verify hua ho
        //ek bar login ho to bar bar login page pr na ja paye dubara
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}
//above logics kis kis page pr execute hoga
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/profile',
        '/profile/:path*',
        '/verifyemail'
    ]

}
//middleware kisi routes me lagana hia to uske liye matcher me config karte hai