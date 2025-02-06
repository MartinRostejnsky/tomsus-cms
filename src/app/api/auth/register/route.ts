// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    // Ověřit, zda uživatel už neexistuje
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // V reálné app hashujeme heslo
    const hashedPassword = await hash(password, 10);

    // Vytvořit uživatele
    const user = await prisma.user.create({
      data: {
        email,
        name,
        // hashedPassword (pokud si uděláte ve schema.prisma sloupec hashedPassword)
      },
    });

    return res.json(user);
  }

  // Jiná HTTP metoda -> 405
  res.status(405).end();
}
