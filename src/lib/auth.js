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

  // ⭐ এই কনফিগারেশনটি প্রোফাইল আপডেট ও এডিট করার পারমিশন অন করে দেবে
  user: {
    modelName: "user",
    additionalFields: {},
  },

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

export const GET = auth.handler;
export const POST = auth.handler;