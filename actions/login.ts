"use server"




import { LoginSchema } from "@/schemas/login"
import * as z from "zod"
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail"
import { getTwoFactorTokenbyEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"

export const login = async (
    values : z.infer<typeof LoginSchema>,
    callbackUrl? : string | null
) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) return { error: "Invalid Credentials!" }
    
    const {email, password, code} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error : "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return { success : "Confirmation Email sent!" }
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenbyEmail(existingUser.email)
            
            if (!twoFactorToken) return {error : "Invalid Code!"}
            
            if (code !== twoFactorToken?.token) return {error : "Invalid Code!"}

             const hasExpired = new Date(twoFactorToken.expires) < new Date()

             if (hasExpired) return {error : "Code Expired!"}

             await db.twoFactorToken.delete({
                where : {id : twoFactorToken.id}
             })

             await db.twoFactorConfirmation.create({
                data: {
                   userId : existingUser.id 
                }
             })

        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    
            await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token)
    
            return { twoFactor : true }
        }
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
        
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error:"Invalid Credentials!"}
                    
                default:
                    return {error:"Something went wrong!"}
            }
        }
        throw error
    }
}

