import NextAuth from 'next-auth';
import { prisma } from '@/utils/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from '@/auth.config';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
  unstable_update
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      // console.log(user, account)

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
        if (token.email != null) {
          session.user.email = token.email;
        }
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
      token.name = existingUser.username;
      token.email = existingUser.email;

      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});
