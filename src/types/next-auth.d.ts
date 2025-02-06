import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        id: string;
    }

    interface User extends DefaultUser {
        email: string;
        name: string;
        id: string;
    }
}