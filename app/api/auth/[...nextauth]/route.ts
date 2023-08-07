import NextAuth, { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import CredentialsProvider from "next-auth/providers/credentials";
import jwtDecode from "jwt-decode";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const { email, password } = credentials;
          const res = await logIn(email, password);
          const user: {
            userId: string;
          } = jwtDecode(res.data.data.token.toString());
          return {
            id: user.userId,
            email: email,
            token: res.data.data.token,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async signIn({
      user,
      account,
    }: {
      user: (User | AdapterUser) & { token: string };
      account: Account | null;
    }) {
      if (account) {
        account.access_token = user.token;
      }
      return true;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token;
      session.user = user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
function logIn(email: string, password: string) {
  throw new Error("Function not implemented.");
}
