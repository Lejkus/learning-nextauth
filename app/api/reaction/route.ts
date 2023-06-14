import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { ReactionType } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.json();
  const { postId, userId, reactionType } = body;

  console.log(body);

  // Sprawdź, czy reactionType jest jednym z dozwolonych wartości enum
  if (!Object.values(ReactionType).includes(reactionType)) {
    return new Response(JSON.stringify({ error: "Invalid reactionType" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const existingReaction = await prisma.reaction.findFirst({
    where: {
      AND: [{ postId: postId }, { authorId: userId }],
    },
  });

  if (existingReaction) {
    // Reakcja już istnieje, więc usuwamy ją i dodajemy nową
    
    //sprawdzaMY czy jest taka sama jak poprzednia jeśli tak to usuwamy
    if (existingReaction.ReactionType === reactionType) {
      await prisma.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });
    } else {
      await prisma.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });

      await prisma.reaction.create({
        data: {
          ReactionType: reactionType,
          authorId: userId,
          postId: postId,
        },
      });
    }
  } else {
    // Reakcja nie istnieje, więc dodajemy nową
    await prisma.reaction.create({
      data: {
        ReactionType: reactionType,
        authorId: userId,
        postId: postId,
      },
    });
  }

  const reaction = await prisma.reaction.findFirst({
    where: {
      AND: [{ postId: postId }, { authorId: userId }],
    },
  });

  return NextResponse.json(reaction);
}
