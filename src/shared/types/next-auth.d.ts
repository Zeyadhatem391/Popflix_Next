import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    role: string;
    provider: string;

    user: DefaultSession["user"] & {
      id: string;
    };
  }

  interface User {
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    provider: string;
    image?: string | null;
  }
}