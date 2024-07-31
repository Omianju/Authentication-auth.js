"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas/login"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"


export const register = async (values:z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) return {error: "Invalid Credentials!"}
    
    const { name, email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email)

    if (existingUser) return {error:"Email already exists!"}
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    
    const verificationToken = await generateVerificationToken(email)
    
    return {success : "Confirmation mail sent!"}

    //TODO: Add email verification
}