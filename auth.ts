import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where:{ id: user.id },
        data:{ emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({user, account}) {
      // Allow OAuth without email verification,
      if (account?.provider !== "credentials") return true
      
      if (user.id) {
        const existingUser = await getUserById(user.id)
        
        // Prevent Sign in without email verification.
        if (!existingUser?.emailVerified) return false
      }
      
      // TODO: Add 2FA check
      return true
    },
    async session({session,token}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole
      }
      
      // console.log({sessionToken: token})
      // console.log(session)
      return session
    },
    async jwt({token,trigger}) {
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      // console.log({token})
      return token
    }
  },
  adapter : PrismaAdapter(db),
  session : { strategy: "jwt" },
  ...authConfig
})
