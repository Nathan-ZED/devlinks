import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
              },
              //@ts-ignore
              async authorize(credentials, req) {
                const user = await prisma.user.findFirst({
                    where: {email: {equals: credentials?.email}}
                });
                const passwordIsCorrect: boolean = await compare(credentials?.password || "", user?.password || "");

                console.log(passwordIsCorrect);

                if(passwordIsCorrect) {
                    console.log(user);
                    return {
                        id: user?.id,
                        email: user?.email,
                        name: user?.name,
                        image: user?.thumbnail,
                    }
                }
                return null
            }
        })
    ]
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}