import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"

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
      
        // TODO: Add 2FA check
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

          if (!twoFactorConfirmation) return false

          // Delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where : {id : twoFactorConfirmation.id}
          })
        }
      }
      

      return true
    },
    async session({session, token}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role = token.role as UserRole
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }
      
      
      return session
    },
    async jwt({token, trigger}) {
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      const existingAccount = await getAccountByUserId(existingUser.id)

      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
     
      return token
    }
  },
  adapter : PrismaAdapter(db),
  session : { strategy: "jwt" },
  ...authConfig
})
