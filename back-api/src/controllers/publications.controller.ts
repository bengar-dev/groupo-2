import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllPublications = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const publications = await prisma.publication.findMany();
    return res.status(200).json(publications);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const postOnePublication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { content } = req.body;
  const { userId } = res.locals;
  try {
    const imgUrl = req.file
      ? `${process.env.DEV_ENV}:${process.env.API_PORT}/api/images/${req.file.filename}`
      : null;
    const publication = await prisma.publication.create({
      data: {
        content,
        imgUrl,
        authorId: userId,
      },
    });
    return res.status(201).json(publication);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
