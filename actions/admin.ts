"use server"

import { currentUserRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { NextResponse } from "next/server"




export const admin = async () => {
    const role = await currentUserRole()
    if (role === UserRole.ADMIN) {
        return true
    } else {
        return false
    }
}