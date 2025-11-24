import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
    strategy: "jwt",
   },
   pages: {
    signIn: '/signin',
   },
   providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {},
            password: {},
        },
        async authorize(credentials) {
            console.log("LOGIN CREDENTIALS:", credentials);
            if (!credentials?.email || !credentials?.password) {
                return null;
            }

            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
            });

            if (!user) return null;

            const isValid = await bcrypt.compare(
                credentials.password,
                user.password
            );

            if (!isValid) return null;

            return user;
        },
    }),
   ],
   callbacks: {
    async jwt({ token, user }) {
        if (user) token.id = user.id;
        return token;
    },
    async session({ session, token }) {
        if (token) {
            session.user.id = token.id;
        }
        return session;
    }
   },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };