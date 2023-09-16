export { default } from "next-auth/middleware";

// The following routes are protected routes
export const config = {
  matcher: ["/optimizations"],
};
