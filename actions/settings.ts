"use server"

import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas/login"
import * as z from "zod"
import bcrypt from "bcryptjs"



export const settings = async (
    values : z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser()
    
    if (!user) return {error: "Unauthorized!"}
    
    if (user.id) {
        const DbUser = await getUserById(user.id)
        if (!DbUser) return {error : "Unauthorized!"}
        
        if (user.isOAuth) {
            
            values.email = undefined
            values.isTwoFactorEnabled = undefined
            values.password = undefined
            values.newPassword = undefined
        }

        if (values.email && values.email !== user.email) {
            const existingUser = await getUserByEmail(values.email)

            if (existingUser && existingUser.id !== user.id){
                return { error : "Email already in use!" }
            }

            const verificationToken = await generateVerificationToken(values.email)

            await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
            )

            return { success : "Verification Email Sent." }
        }

        if (values.password && values.newPassword && DbUser.password) {
            const passwordMatch = await bcrypt.compare(values.password, DbUser.password)
            if (!passwordMatch) return { error : "Incorrect Password!" }
            
            const hashedPassword = await bcrypt.hash(values.newPassword, 10)
            values.password = hashedPassword
            values.newPassword = undefined
        }
        
        await db.user.update({
            where : { id : DbUser.id},
            data : {
                ...values,
            }
        })
    }
    return {success : "Settings Updated"}
}