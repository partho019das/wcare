import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // NEXT_PUBLIC_BETTER_AUTH_URL না পাওয়া গেলে কারেন্ট ব্রাউজার ইউআরএল (window.location.origin) ব্যাকআপ হিসেবে কাজ করবে
  baseURL: typeof window !== "undefined" 
    ? (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || window.location.origin)
    : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000")
});