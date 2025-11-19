// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // ============ CORE USER FIELDS ============
      id: string;
      email: string;
      name?: string | null;
      role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'; // ✅ CHANGED: string → literal union
      image?: string | null;
      emailVerified?: Date | null;
      
      // ============ PROFILE FIELDS (Full Prisma Profile Alignment) ============
      profile?: {
        // ============ IDENTIFICATION & RELATIONSHIP FIELDS ============
        id: string;
        userId: string;
        
        // ============ PROFESSIONAL INFORMATION ============
        company?: string | null;
        jobTitle?: string | null;
        
        // ============ CONTACT & PERSONAL INFORMATION ============
        phone?: string | null;
        bio?: string | null;
        avatar?: string | null;
        
        // ============ PREFERENCES & SETTINGS ============
        timezone?: string;
        preferences?: string | null;  // JSON string for user preferences
        
        // ============ TIMESTAMP FIELDS ============
        createdAt?: Date;
        updatedAt?: Date;
      } | null;
    };
  }

  interface User {
    // ============ CORE USER FIELDS ============
    id: string;
    email: string;
    name?: string | null;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'; // ✅ CHANGED: string → literal union
    image?: string | null;
    emailVerified?: Date | null;
    
    // ============ PROFILE FIELDS (Full Prisma Profile Alignment) ============
    profile?: {
      // ============ IDENTIFICATION & RELATIONSHIP FIELDS ============
      id: string;
      userId: string;
      
      // ============ PROFESSIONAL INFORMATION ============
      company?: string | null;
      jobTitle?: string | null;
      
      // ============ CONTACT & PERSONAL INFORMATION ============
      phone?: string | null;
      bio?: string | null;
      avatar?: string | null;
      
      // ============ PREFERENCES & SETTINGS ============
      timezone?: string;
      preferences?: string | null;  // JSON string for user preferences
      
      // ============ TIMESTAMP FIELDS ============
      createdAt?: Date;
      updatedAt?: Date;
    } | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // ============ CORE JWT FIELDS ============
    id: string;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'; // ✅ CHANGED: string → literal union
    
    // ============ PROFILE FIELDS (Full Prisma Profile Alignment) ============
    profile?: {
      // ============ IDENTIFICATION & RELATIONSHIP FIELDS ============
      id: string;
      userId: string;
      
      // ============ PROFESSIONAL INFORMATION ============
      company?: string | null;
      jobTitle?: string | null;
      
      // ============ CONTACT & PERSONAL INFORMATION ============
      phone?: string | null;
      bio?: string | null;
      avatar?: string | null;
      
      // ============ PREFERENCES & SETTINGS ============
      timezone?: string;
      preferences?: string | null;  // JSON string for user preferences
      
      // ============ TIMESTAMP FIELDS ============
      createdAt?: Date;
      updatedAt?: Date;
    } | null;
  }
}