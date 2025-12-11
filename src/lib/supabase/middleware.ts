import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Create a response object
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Create supabase client that can read/write cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // refreshing the auth token
  // await supabase.auth.getUser()

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: Don't remove getClaims()

  // Check if user is logged in
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  /// Routes that anyone can access (no login required)
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password", // User needs to access this from email link
    "/auth",
    "/test" // Handles email confirmations
  ];

  // Check if current path is public
  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(`${route}/`)
  );

  // If user IS logged in and on auth pages (but not reset-password)
  const authPagesForLoggedInRedirect = [
    "/login",
    "/signup",
    "/forgot-password",
  ];
  const shouldRedirectToDashboard = authPagesForLoggedInRedirect.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (user && shouldRedirectToDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // If NO user and trying to access protected page
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Return the responses
  return supabaseResponse;
}
