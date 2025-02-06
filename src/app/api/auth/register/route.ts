import type { NextApiRequest } from "next";
import register from "@/actions/auth/register";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return await register(await req.json());
}