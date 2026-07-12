import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // কোনো ডাইনামিক ফাংশন ছাড়া সরাসরি লাইভ লিঙ্ক যাতে বিল্ডের সময় কোনো ঝামেলা না হয়
  baseURL: "https://wcare-gamma.vercel.app"
});