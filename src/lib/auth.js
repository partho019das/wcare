import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("docter");

// একদম নিরেট ফলব্যাক হিসেবে একটি ডিফল্ট স্ট্রিং দিয়ে রাখছি যেন বিল্ডের সময় undefined না হয়
const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000") || 
  "http://localhost:3000"; 

export const auth = betterAuth({
  // বিল্ড ক্র্যাশ এড়াতে সিক্রেট কি-কেও নিরাপদ করা হলো
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-for-building-phase",
  baseURL: baseURL,

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