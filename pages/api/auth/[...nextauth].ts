import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"

import prisma from '@/app/libs/prismadb'

import { PrismaAdapter } from "@next-auth/prisma-adapter"


export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    // CredentialsProvider({
    //   name: 'credentials',
    //   credentials: {
    //     email: { label: 'email', type: 'text' },
    //     password: { label: 'password', type: 'password' }
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       throw new Error('Invalid credentials');
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email
    //       }
    //     });

    //     if (!user || !user?.hashedPassword) {
    //       throw new Error('Invalid credentials');
    //     }

        

    //     // const isCorrectPassword = await bcrypt.compare(
    //     //   credentials.password,
    //     //   user.hashedPassword
    //     // );

    //     const isCorrectPassword = credentials.password === user.hashedPassword

    //     if (!isCorrectPassword) {
    //       throw new Error('Invalid credentials');
    //     }
    //     console.log(user);
        
    //     return user;
    //   }
    // })
  ],
}

export default NextAuth(authOptions)