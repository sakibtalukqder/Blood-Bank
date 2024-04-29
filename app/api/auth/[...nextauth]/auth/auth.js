import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt";
import { prisma } from "@/config/db";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/components/login'
    },
    session: {
        strategy: 'jwt'
    },

    secret: process.env.JWT_SECRET,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log("No email || Password");
                    return null;
                }
                const exUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (!exUser) {
                    console.log("No account with this email");
                    return null;
                }
                const matchPassword = await compare(credentials.password, exUser.password);
                if (!matchPassword) {
                    console.log('Wrong Password');
                    return null;
                }

                if (matchPassword) {
                    return {
                        id: exUser.id,
                        name: exUser.name,
                        email: exUser.email,
                        role: exUser.role,
                    }
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    role: user.role,
                    id: user.id,
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    id: token.id,
                },
            }
        },

    }
}

export default NextAuth(authOptions)