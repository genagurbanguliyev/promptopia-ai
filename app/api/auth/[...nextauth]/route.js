import prisma from "@lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { custom } from "openid-client";

// custom.setHttpOptionsDefaults({
//   timeout: 10000,
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // httpOptions: { timeout: 5000 },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      session.user.id = sessionUser.id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        // check if an user already exist
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
          select: {
            email: true,
            username: true,
            image: true,
          },
        });

        //if not, create a new user
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.name,
              image: profile.picture,
            },
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
