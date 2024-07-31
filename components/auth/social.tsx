"use client"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
export const Social = () => {
    const onClick = (provider: "github" | "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className="flex w-full items-center space-x-4">
            <Button onClick={()=>onClick("google")} variant={"outline"} size={"lg"} className="w-full">
                <FcGoogle className="h-7 w-7" />
            </Button>
            <Button onClick={()=>onClick("github")} variant={"outline"} size={"lg"} className="w-full">
                <FaGithub className="h-7 w-7" />
            </Button>
        </div>
    )
}