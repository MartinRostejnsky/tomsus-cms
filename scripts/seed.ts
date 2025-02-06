// scripts/seed.ts
import { prisma } from "@/lib/prisma"; // cesta podle vašeho projektu

async function main() {
  await prisma.user.create({
    data: {
      name: "Adam",
      email: "adam@example.com",
    },
  });
  console.log("Uživatel vytvořen.");
}

main().finally(() => prisma.$disconnect());
