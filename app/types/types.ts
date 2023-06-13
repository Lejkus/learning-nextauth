import { Post } from "@prisma/client";

export type SafePost = Omit<Post, "createdAt"> & {
    createdAt: string;
  };

  