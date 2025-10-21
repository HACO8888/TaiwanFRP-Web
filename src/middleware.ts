import { auth } from "@/lib/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

export default auth((req: NextAuthRequest) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnLogin = req.nextUrl.pathname.startsWith("/login");

  // 如果已登入且在登入頁，導向首頁
  if (isLoggedIn && isOnLogin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 如果未登入且訪問需要登入的頁面，導向登入頁
  if (!isLoggedIn && isOnDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

// 設定哪些路由需要檢查
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
