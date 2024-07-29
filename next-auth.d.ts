import NextAuth, {type DefaultSession} from "next-auth";
import { UserRole } from "@prisma/client";



export type ExtendedUser = DefaultSession["user"] & {
    role : UserRole
}


declare module "@auth/core" {
    interface Session {
        user: ExtendedUser
    }
}