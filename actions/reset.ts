"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generateResetPasswordToken } from "@/lib/tokens"
import { ResetSchema } from "@/schemas/login"
import * as z from "zod"

export const reset = async (
    values: z.infer<typeof ResetSchema>
) => {
    const validatedFields = ResetSchema.safeParse(values)
    if (!validatedFields.success) return {error: "Invalid!"}
    
    const { email } = validatedFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser) return {error : "Email does not exist!"}

    const passwordResetToken = await generateResetPasswordToken(
        email
    )

    if (passwordResetToken) {
        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token
        )
    }

    return {success: "Reset Email send"}
} 