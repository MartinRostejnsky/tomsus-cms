"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

interface RegisterParams {
    email: string;
    password: string;
    name: string;
}

const register = async (params: RegisterParams) => {
  const { email, password, name } = params;
  
    // Ověřit, zda uživatel už neexistuje
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, {status: 400});
    }
  
    // V reálné app hashujeme heslo
    const hashedPassword = await hash(password, 10);
  
    // Vytvořit uživatele
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
  
    return NextResponse.json({
        id: user.id,
    }, {status: 200});
};

export default register;