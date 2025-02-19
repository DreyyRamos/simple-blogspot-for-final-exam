import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../../(utils)/middleware/auth";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 1;

const handler = async (req) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
        comments: {
          select: {
            comment_content: true,
            author: {
              select: {
                id: true,
                name: true,
                profileImage: true,
              },
            },
            commentId: true,
          },
        },
        likes: true,
      },
    });

    console.log(posts);

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ status: 200 });
};

export const GET = handler;
