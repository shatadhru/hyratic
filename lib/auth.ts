import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { username } from "better-auth/plugins"
import { dash } from "@better-auth/infra";



const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL ||"http://localhost:3000/",
  emailAndPassword: { enabled: true },
  socialProviders: {
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [username(), dash()],
   user: {
    additionalFields: {
      role: {
        type: ["freelancers", "clients", "both"],
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      }
    },
  },
 


});
