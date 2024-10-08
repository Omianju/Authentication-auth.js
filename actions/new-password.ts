"use server"

import { getResetPasswordTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { NewPasswordSchema } from '@/schemas/login'
import * as z from 'zod'
import bcrypt from "bcryptjs"
import { db } from '@/lib/db'



export const newPassword = async (
    values : z.infer<typeof NewPasswordSchema>,
    token? : string
) => {
    const validatedFields = NewPasswordSchema.safeParse(values)
    if (!validatedFields.success) return { error : "Invalid Password!" }

    const { password } = validatedFields.data

    if (!token) return {error : "Token Missing!"}

    const existingToken = await getResetPasswordTokenByToken(token)

    console.log(existingToken)
    if (!existingToken) return {error: "Invalid Token!"}
    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) return {error : "Token has expired!"}

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) return { error : "Email does not exist!" }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: { id : existingUser.id },
        data:{ password: hashedPassword }
    })

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })
    
    return { success : "Pasword reset successfully" }

}