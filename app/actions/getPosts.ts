import prisma from "@/app/libs/prismadb";

export default async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        Author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reactions: {
          select: {
            id: true,
            ReactionType: true,
            authorId: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
};
