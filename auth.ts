import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"

export const { handlers: { GET ,POST }, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({session,token}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole
      }
      
      console.log({sessionToken: token})
      console.log(session)
      return session
    },
    async jwt({token,trigger}) {
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.role = existingUser.role
      console.log({token})
      return token
    }
  },
  adapter : PrismaAdapter(db) ,
  session : { strategy: "jwt" },
  ...authConfig
})
