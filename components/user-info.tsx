import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"


interface UserInfoProps {
    user? : ExtendedUser
    label: string
}




export const UserInfo = ({
    user,
    label
}:UserInfoProps) => {
    return (
        <Card className="md:w-[600px] w-[400px] shadow-sm">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">
                        ID
                    </p>
                    <p className="bg-slate-100 truncate max-w-[180px] rounded-md font-mono p-1">
                        {user?.id}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">
                        Name
                    </p>
                    <p className="bg-slate-100 truncate max-w-[180px] rounded-md font-mono p-1">
                        {user?.name}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">
                        Email
                    </p>
                    <p className="bg-slate-100 truncate max-w-[200px] rounded-md font-mono p-1">
                        {user?.email}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">
                        Role
                    </p>
                    <p className="bg-slate-100 truncate max-w-[180px] rounded-md font-mono p-1">
                        {user?.role}
                    </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium ">
                        Two Factor Authentication
                    </p>
                    <Badge
                    className="pt-1" 
                    variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
                    >
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}