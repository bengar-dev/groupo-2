import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import fs from "fs";

const prisma = new PrismaClient();

export const getAllPublications = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const publications = await prisma.publication.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
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

export const deleteOnePublication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { userId } = res.locals;
  try {
    const publication = await prisma.publication.findUnique({ where: { id } });
    if (!publication) throw new Error("Publication not found");
    if (publication.authorId !== userId)
      throw new Error("Publication doesn't own you");
    if (publication.imgUrl) {
      const fileName = publication.imgUrl.split("/images/")[1];
      fs.unlink(`images/${fileName}`, (err) => {
        if (err) throw new Error("Can not delete image");
      });
    }
    await prisma.publication.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: `Publication ${id} has been deleted` });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
