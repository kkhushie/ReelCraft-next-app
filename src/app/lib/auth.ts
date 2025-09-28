import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnect } from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },


            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password are required")
                }
                try {
                    await dbConnect();
                    const user = await User.findOne({ email: credentials.email })


                    if (!user) {
                        throw new Error("No user found with the given email")
                    }
                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if (!isValid) {
                        throw new Error("Invalid Password")
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }
                }
                catch (error) {
                    console.error("Authorize error:", error)
                    throw error
                }
            },


        }),
        // ✅ Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile }) {
          if (account?.provider === "google") {
            await dbConnect();
            const existingUser = await User.findOne({ email: user.email });
      
            if (!existingUser) {
              await User.create({
                email: user.email,
                password: null, // since Google user won’t need password
              });
            }
          }
          return true;
        },
      
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id || token.id;
          }
          return token;
        },
      
        async session({ session, token }) {
          if (session.user) {
            session.user.id = token.id as string;
          }
          return session;
        },
      },      
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}
