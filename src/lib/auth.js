import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("docter");

export const auth = betterAuth({
  baseURL: "https://wcare-gamma.vercel.app", 
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-for-building-phase",

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-secret",
    },
  },
});

// এই কাস্টম ফাংশনটি Vercel-এর যেকোনো ভুল ফোল্ডার নেমিং-এর সমস্যাকে বাইপাস করে দেবে
const handleAuth = async (req) => {
  return auth.handler(req);
};

export { handleAuth as GET, handleAuth as POST };