import { createAuthClient } from "better-auth/react";

// বিল্ড টাইমে এবং রানটাইমে একটি ভ্যালিড ইউআরএল নিশ্চিত করার লজিক
const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://wcare-gamma.vercel.app"; // সার্ভার সাইড বিল্ডের জন্য আপনার নিখুঁত লাইভ লিঙ্ক
};

export const authClient = createAuthClient({
  baseURL: getBaseURL()
});