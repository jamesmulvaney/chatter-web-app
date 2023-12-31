import { ChatSession } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    username?: string | null;
  }
}
