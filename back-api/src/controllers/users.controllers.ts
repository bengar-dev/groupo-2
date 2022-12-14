import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User as UserModel } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { deleteKeysFromData } from "~/misc/deleteKeys";
import jwt from "jsonwebtoken";
import fs from "fs";

const prisma = new PrismaClient();

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users: UserModel[] = await prisma.user.findMany();
    const cleanUsers: UserModel[] = deleteKeysFromData(users, ["password"]);
    return res.status(200).json(cleanUsers);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Publication: true },
    });
    if (!user) throw new Error("User not found");
    const cleanUser = deleteKeysFromData([user], ["password"], true);
    return res.status(200).json(cleanUser);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getUserInfoByToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = res.locals;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    const cleanUser = deleteKeysFromData([user], ["password"], true);
    return res.status(200).json(cleanUser);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const editUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = res.locals;
  const { firstName, lastName, email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");
    const avatar = req.file
      ? `${process.env.DEV_ENV}:${process.env.API_PORT}/api/images/${req.file.filename}`
      : user.avatar;
    if (req.file) {
      const fileCurrentName = user.avatar.split("/images/")[1];
      if (fileCurrentName) {
        fs.unlink(`images/${fileCurrentName}`, (err) => {
          if (err) throw new Error("Error while deleting image");
        });
      }
    }
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        avatar,
      },
    });
    return res.status(200).json(updateUser);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const registerOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password, firstName, lastName } = req.body.data;
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
    return res.status(500).json({ error: err.message });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body.data;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");
    if (!bcrypt.compareSync(password, user.password))
      throw new Error("Password incorrect");
    const token = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_KEY || "TOKEN",
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({ token });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
