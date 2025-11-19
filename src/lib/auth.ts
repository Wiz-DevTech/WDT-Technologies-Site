// lib/auth.ts
import { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const auth: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          role: "USER", // ✅ PRESERVED: Already a string literal
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: {
            profile: true
          }
        });

        if (!user) {
          return null;
        }

        // TODO: Add proper password verification
        console.warn("⚠️ Implement proper password verification in production!");

        // ============ FULL PRISMA PROFILE TRANSFORMATION ============
        const transformedUser: User = {
          // Core User Fields
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toString() as 'USER' | 'ADMIN' | 'SUPER_ADMIN', // ✅ ADDED: Runtime conversion
          image: user.image,
          emailVerified: user.emailVerified,
          
          // Full Profile Transformation (matches Prisma exactly)
          profile: user.profile ? {
            // ============ IDENTIFICATION & RELATIONSHIP FIELDS ============
            id: user.profile.id,
            userId: user.profile.userId,
            
            // ============ PROFESSIONAL INFORMATION ============
            company: user.profile.company,
            jobTitle: user.profile.jobTitle,
            
            // ============ CONTACT & PERSONAL INFORMATION ============
            phone: user.profile.phone,
            bio: user.profile.bio,
            avatar: user.profile.avatar,
            
            // ============ PREFERENCES & SETTINGS ============
            timezone: user.profile.timezone,
            preferences: user.profile.preferences,
            
            // ============ TIMESTAMP FIELDS ============
            createdAt: user.profile.createdAt,
            updatedAt: user.profile.updatedAt,
          } : null
        };

        return transformedUser;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        // Core User Fields
        session.user.id = token.id;
        session.user.role = token.role; // ✅ PRESERVED: No changes needed
        
        // Full Profile Data
        session.user.profile = token.profile;
      }
      return session;
    },
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profile = user.profile;
      }
      
      // Refresh profile data on each sign in (optional)
      if (account) {
        const userData = await db.user.findUnique({
          where: { id: token.id as string },
          include: { profile: true }
        });
        
        if (userData?.profile) {
          token.profile = {
            // ============ IDENTIFICATION & RELATIONSHIP FIELDS ============
            id: userData.profile.id,
            userId: userData.profile.userId,
            
            // ============ PROFESSIONAL INFORMATION ============
            company: userData.profile.company,
            jobTitle: userData.profile.jobTitle,
            
            // ============ CONTACT & PERSONAL INFORMATION ============
            phone: userData.profile.phone,
            bio: userData.profile.bio,
            avatar: userData.profile.avatar,
            
            // ============ PREFERENCES & SETTINGS ============
            timezone: userData.profile.timezone,
            preferences: userData.profile.preferences,
            
            // ============ TIMESTAMP FIELDS ============
            createdAt: userData.profile.createdAt,
            updatedAt: userData.profile.updatedAt,
          };
        }
        
        // ✅ ADDED: Convert role on token refresh too
        if (userData) {
          token.role = userData.role.toString() as 'USER' | 'ADMIN' | 'SUPER_ADMIN';
        }
      }
      
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};