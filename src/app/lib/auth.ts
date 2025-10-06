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
          
          // Check if user has a password (Google users might not have one)
          if (!user.password) {
            throw new Error("Please use Google sign-in for this account")
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        console.log("Google profile:", profile);
        return {
          id: profile.sub, // This is the Google ID
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For credentials provider, just return true
      if (account?.provider === "credentials") {
        return true;
      }

      // For Google provider
      if (account?.provider === "google") {
        try {
          await dbConnect();
          
          const googleId = user.id; // This comes from the profile callback above
          const email = user.email;

          if (!email) {
            console.error("No email from Google provider");
            return false;
          }


          // Find existing user by email or googleId
          const existingUser = await User.findOne({
            $or: [
              { email: email },
              { googleId: googleId }
            ]
          });


          if (existingUser) {
            // Update googleId if missing
            if (!existingUser.googleId) {
              existingUser.googleId = googleId;
              await existingUser.save();
              console.log("Updated user with googleId");
            }
            // Update the user object for JWT callback
            user.id = existingUser._id;
            return true;
          } else {
            // Create new user
            const newUser = await User.create({
              email: email,
              googleId: googleId,
              password:"", // No password for Google users
              });

            user.id = newUser._id;
            return true;
          }
        } catch (error) {
          console.error("Google signIn error:", error);
          return false;
        }
      }

      return false;
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user && account) {
        token.id = user.id;
        token.provider = account.provider;
      }
      
      // Ensure we have a valid ID
      if (token.id && typeof token.id !== 'string') {
        token.id = token.id.toString();
      }
      
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
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
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug mode
}