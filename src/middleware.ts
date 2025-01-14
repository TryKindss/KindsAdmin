export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!login|register).*)"], // Protect all routes except /login and /register
};
