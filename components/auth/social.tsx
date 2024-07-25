"use client"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
export const Social = () => {
    return (
        <div className="flex w-full items-center space-x-4">
            <Button variant={"outline"} size={"lg"} className="w-full">
                <FcGoogle className="h-7 w-7" />
            </Button>
            <Button variant={"outline"} size={"lg"} className="w-full">
                <FaGithub className="h-7 w-7" />
            </Button>
        </div>
    )
}