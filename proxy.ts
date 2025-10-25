import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', request.url));
}