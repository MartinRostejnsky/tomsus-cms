import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: number;
            email: string;
            name: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: number;
        email: string;
        name: string;
    }
}