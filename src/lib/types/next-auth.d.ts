import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    phone?: string; 
  }

  interface User {
    accessToken?: string;
    phone?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    phone?: string;
  }
}