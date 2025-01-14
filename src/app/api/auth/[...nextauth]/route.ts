import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
// import notificatonService from "@/services/notificaton.service";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const baseUrl = "https://us.pureworker.com/api/auth/verify-signin-otp";

        const { email, password } = credentials as Credentials;

        if (!email || !password) {
          console.error("Missing email or password");
          return null;
        }

        try {
          const response = await axios.post(baseUrl, {
            email,
            password,
          });

          const user = response.data;

          if ((response.status === 200 || response.status === 201) && user) {
            return user;
          } else {
            console.error("Login failed", response.status, user);
            return null;
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // notificatonService.error("An error occured");
            console.error("Axios error in authorizing", error.response?.data);
          } else {
            console.error("Unexpected error in authorizing", error);
          }
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
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "process.env.NEXTAUTH_SECRET",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
