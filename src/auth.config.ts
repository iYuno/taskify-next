import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { getUser } from '@/lib/data';

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );
          if (passwordsMatch) return user;
        }
        return null
      }
    })
  ],
  // callbacks: {
  //   authorized({ auth, request }) {
  //     const isLoggedIn = !!auth?.user
  //
  //     console.log(auth?.user)
  //     const isOnLogin = request.nextUrl.pathname.startsWith('/login')
  //     if (isLoggedIn && isOnLogin) {
  //       return Response.redirect(new URL('/', request.nextUrl))
  //     }
  //     return isLoggedIn
  //   },
  // },
} satisfies NextAuthConfig;
