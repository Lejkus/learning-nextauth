import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  //need to check if reaction already exist
  //if yes delete and add new one
  //if no add one

  const body = await request.json();
  const { postId, userId, reactionType } = body;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(post);
}
