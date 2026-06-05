import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "barri_access";
const DEFAULT_ACCESS_CODE = "210801";
const PUBLIC_FILE = /\.(.*)$/;

function isPublicPath(pathname: string) {
  return (
    pathname === "/acceso" ||
    pathname.startsWith("/api/access") ||
    pathname.startsWith("/api/responses") ||
    pathname.startsWith("/api/visits") ||
    pathname.startsWith("/api/instagram") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/media") ||
    pathname === "/icon.png" ||
    pathname === "/apple-icon.png" ||
    PUBLIC_FILE.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const accessCode = process.env.ACCESS_CODE ?? DEFAULT_ACCESS_CODE;

  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get(ACCESS_COOKIE)?.value === accessCode;
  if (hasAccess) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/acceso";
  url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api/admin|admin).*)"],
};
