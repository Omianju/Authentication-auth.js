import { UserRole } from "@prisma/client"
import * as z from "zod"





export const SettingsSchema = z.object({
    name : z.string().optional(),
    isTwoFactorEnabled : z.boolean().optional(),
    role : z.enum([UserRole.ADMIN, UserRole.USER]),
    email : z.string().email().optional(),
    password : z.string().min(6).optional(),
    newPassword : z.string().min(6).optional()
})

.refine((data)=>{
    if (data.password && !data.newPassword) return false
    return true
},
{ message:"New Password is required!", path : ["newPassword"] }
)

.refine((data) => {
    if(data.newPassword && !data.password) return false
    return true
},
{ message:"Password is required!", path : ["password"] }
)


export const NewPasswordSchema = z.object({
    password : z.string().min(6, {message:"Minimum of 6 characters required."})
})


export const ResetSchema = z.object({
    email: z.string().email({message:"Email is required"})
})



export const LoginSchema = z.object({
    email : z.string().email({message:"Email is required."}),
    password : z.string().min(1,{message:"Password is required."}),
    code : z.string().optional()
})

export const RegisterSchema = z.object({
    name : z.string().min(1,{message: "Name is required."}),
    email : z.string().email({message:"Email is required."}),
    password : z.string().min(6,{message:"Password must have atleast 6 characters."})
})