import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const authVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtToken = req.headers.authorization?.split(" ")[1];
    if (!jwtToken) throw new Error("Token doesn't exist");
    const jwtDecodedToken: any = jwt.verify(
      jwtToken,
      process.env.TOKEN_KEY || "TOKEN"
    );
    const userId: string = jwtDecodedToken.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");
    next();
  } catch (err: any) {
    console.log(err);
    return res.status(401).json({ error: err.message });
  }
};
