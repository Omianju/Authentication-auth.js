"use client"

import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from 'react'




export const Navbar = () => {
    const pathName = usePathname()
    const [isMobile, setIsMobile] = useState<boolean | undefined>();
    
    useEffect(()=>{
        setIsMobile(window.innerWidth < 768)
    },[])
    
    return (
        <nav className="bg-secondary rounded-xl p-4 w-[400px] md:w-[600px] flex items-center justify-between shadow-sm">
            <div className="flex gap-x-2">
            <Button
             asChild
             size={isMobile? "sm" : "default"}
             variant={pathName === "/server" ? "default" : "outline"}
             >
                <Link href={"/server"}>
                    Server
                </Link>
            </Button>

            <Button 
            asChild
            size={isMobile? "sm" : "default"}
            variant={pathName === "/client" ? "default" : "outline"}
            >
                <Link href={"/client"}>
                    Client
                </Link>
            </Button>

            <Button 
            asChild
            size={isMobile? "sm" : "default"}
            variant={pathName === "/admin" ? "default" : "outline"}
            >
                <Link href={"/admin"}>
                    Admin
                </Link>
            </Button>

            <Button 
            asChild
            size={isMobile? "sm" : "default"}
            variant={pathName === "/settings" ? "default" : "outline"}
            >
                <Link href={"/settings"}>
                    Settings
                </Link>
            </Button>
            </div>
           <UserButton />
        </nav>
    )
}