"use client"

import { admin } from "@/actions/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

const AdminPage = () => {
    const apiHandler = () => {
        fetch("/api/admin")
        .then((response)=>{
            if(response.ok) {
                toast.success("Allowed API Route.")
            } else {
                toast.error("Forbidden API Route!")
            } 
        })
        
    }
    const actionHandler = () => {
        admin()
        .then((response)=>{
            if (response) {
                toast.success("Allowed Server Action.")
            } else {
                toast.error("Forbidden Server Action!")
            }
        })
    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are are allowed to see this."/>
                </RoleGate>
                <div className="flex items-center justify-between p-3 rounded-lg border shadow-md">
                    <p className="text-sm font-medium">Admin-only API Route</p>
                    <Button onClick={apiHandler}>
                        Click to test
                    </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">Admin-only Server Action</p>
                    <Button onClick={actionHandler} >Click to test</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage