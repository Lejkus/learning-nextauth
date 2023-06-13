import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { topic, content } = body;
  
  const post = await prisma.post.create({
    data: {
      topic,
      content,
      authorId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}
