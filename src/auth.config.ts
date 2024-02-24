import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
import Credentials from '@auth/core/providers/credentials';
import { z } from 'zod';
import { getUser } from '@/app/lib/data';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (!user || !user.passwordHash) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.passwordHash,
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