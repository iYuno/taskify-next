import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '@/auth.config';
import { prisma } from '@/utils/prisma';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
  unstable_update
} = NextAuth({
  ...authConfig,
  debug: true,
  pages: {
    signIn: '/login',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      });

      return !!existingUser;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: {
          id: token.sub
        }
      });

      if (!existingUser) return token;

      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: existingUser.id
        }
      })

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
});
