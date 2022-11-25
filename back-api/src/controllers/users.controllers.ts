import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User as UserModel } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users: UserModel[] = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (err: any) {
    return res.status(500).json({ error: err.messages });
  }
};

export const registerOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = (await prisma.user.findUnique({ where: { email } }))
      ? null
      : await prisma.user.create({
          data: { email, password: hashPassword, firstName, lastName },
        });
    if (!user) throw new Error("Email already exist");
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(500).json({ error: err.messages });
  }
};
