
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
// import { compare } from "bcryptjs";  // volitelně, pokud chcete reálně kontrolovat hesla

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1) Najdeme uživatele v DB podle emailu
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error("Uživatel neexistuje");
        }

        // 2) Ověříme heslo (pokud by bylo uloženo v DB hashované)
        // Příklad: if (!(await compare(credentials.password, user.hashedPassword))) { ... }

        // DEMO: Budeme předpokládat, že heslo je "password"
        if (credentials?.password !== "password") {
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
    signIn: "/auth/signin",
  },
});
