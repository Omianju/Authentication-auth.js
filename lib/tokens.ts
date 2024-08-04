import { getVerificationTokenByEmail } from '@/data/verification-token'
import { v4 as uuidv4 } from 'uuid'
import { db } from './db'
import { getResetPasswordTokenByEmail } from '@/data/password-reset-token'
import crypto from "crypto"
import { getTwoFactorTokenbyEmail } from '@/data/two-factor-token'


export const generateTwoFactorToken = async (
    email : string
) => {
    const token = crypto.randomInt(100_000,10_00_000).toString()
    
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000 )

    const existingToken = await getTwoFactorTokenbyEmail(email)

    if (existingToken) {
        await db.twoFactorToken.delete({
            where : { id : existingToken.id }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data : {
            email,
            token,
            expires
        }
    })

    return twoFactorToken
}

export const generateResetPasswordToken = async (
    email : string
) =>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000 )

    const existingToken = await getResetPasswordTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({
            where : {id: existingToken.id}
        })
    }

    const resetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    
    return resetToken
} 


export const generateVerificationToken = async ( email: string ) => {
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000 )

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await db.verificationToken.delete({
            where : { id : existingToken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data : {
            token,
            email,
            expires
        }
    })

    return verificationToken
}