import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const url = req.nextUrl.clone();

  // List of protected routes
  const isOnProtectedPage = ["/cart", "/profile"].some((path) =>
    url.pathname.startsWith(path)
  );

  // If no token and the user is on a protected page, redirect to sign-in
  if (!token && isOnProtectedPage) {
    url.pathname = "/api/auth/signin";
    return NextResponse.redirect(url);
  }

  // Proceed to the next middleware or the route
  return NextResponse.next();
}

// Middleware matcher configuration
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
