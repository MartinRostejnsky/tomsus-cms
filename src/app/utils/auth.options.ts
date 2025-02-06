import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions : NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials) {
                throw new Error("Neplatné údaje");
            }

          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!user) {
            throw new Error("Uživatel neexistuje");
          }
  
        if (!(await compare(credentials.password, user.hashedPassword))) {
            throw new Error("Nesprávné heslo");
        }
  
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        },
      }),
    ],
    
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/auth/login",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id; // ✅ Ensure id is stored in the token
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as number; // ✅ Ensure id is added to session.user
        }
        return session;
      },
    },
}

export default authOptions;