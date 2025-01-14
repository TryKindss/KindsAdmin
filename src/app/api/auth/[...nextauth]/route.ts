import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import axios from "axios";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 45,
    updateAge: 60 * 45,
  },
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        const baseUrl = "https://api.trykinds.com/auth/login";
        const { email, password } = credentials as any;
        try {
          const response = await axios.post(`${baseUrl}`, {
            email,
            password,
          });

          const user = response.data;
          console.log(user)
          console.log("Response status:", response.status);
          console.log("Response data:", response.data);

          if ((response.status === 200 || response.status === 201) && user) {
            window.location.href = "/";
            console.log("Login successful:", user);
            return user;
          } else {
            console.error("Login failed:", user);
            return null;
          }
        } catch (error) {
          // console.error("Error in authorize:", error);
          console.error(
            "Error in In failingggggg:",
            (error as any).response.data.error
          );
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
