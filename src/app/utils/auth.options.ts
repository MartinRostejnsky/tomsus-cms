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
  
          // 3) Vrátíme objekt, který se vloží do session
          return {
            id: user.id.toString(),
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
      //signIn: "/auth/signin",
    },
}

export default authOptions;