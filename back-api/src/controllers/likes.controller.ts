import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const likeDislikePublication = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { publicationId } = req.params;
  const { userId } = res.locals;
  try {
    const publication = await prisma.publication.findUnique({
      where: { id: publicationId },
    });
    if (!publication) throw new Error("Publication not found");
    if (publication.likes.length === 0) {
      publication.likes.push(userId);
    } else {
      const findUserId = publication.likes.findIndex((like) => like === userId);
      console.log(findUserId);
      if (findUserId !== -1) publication.likes.splice(findUserId, 1);
      else publication.likes.push(userId);
    }

    await prisma.publication.update({
      where: { id: publicationId },
      data: { likes: publication.likes },
    });

    return res.status(200).json(publication);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
