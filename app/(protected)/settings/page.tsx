"use client"
import { settings } from "@/actions/settings"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
     FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useCurrentUser } from "@/hooks/use-current-user"
import { SettingsSchema } from "@/schemas/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"




const SettingPage = () => {
    const user = useCurrentUser()
    const [isPending, startTransition] = useTransition()
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    const { update } = useSession()
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name : user?.name || undefined,
            email : user?.email || undefined,
            password : undefined,
            newPassword : undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled : user?.isTwoFactorEnabled || undefined
        }
    })

    

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
            .then((data)=>{
                if (data.error) {
                    setError(data.error)
                }
                if (data.success) {
                    update()
                    setSuccess(data.success)
                }
            })
            .catch(() => {
                setError("Something went wrong!")
            })
        })
    }
    
    return (
        <Card className="sm:w-[400px] md:w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙️ Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form 
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="md:space-y-4 sm:space-y-2">
                        <FormField
                                name="name"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="john doe"
                                            disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            
                            {user?.isOAuth === false && (
                            <>
                            
                                <FormField
                                name="email"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="johndoe@example.com"
                                            disabled={isPending}
                                            type="email"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField
                                name="password"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="******"
                                            disabled={isPending}
                                            type="password"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField
                                name="newPassword"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            placeholder="******"
                                            disabled={isPending}
                                            type="password"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </>
                            )}
                            <FormField
                            name="role"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select 
                                    disabled={isPending}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={UserRole.ADMIN} >
                                            Admin
                                        </SelectItem>
                                        <SelectItem value={UserRole.USER} >
                                            User
                                        </SelectItem>
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />
                            {user?.isOAuth === false && (

                                <FormField
                                name="isTwoFactorEnabled"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem className="flex items-center justify-between rounded-lg p-3 shadow-md border">
                                        <div className="space-y-0.5">
                                            <FormLabel>Two Factor Authentication</FormLabel>
                                            <FormDescription>Enable two factor authentication for your account</FormDescription>
                                        </div>
                                        <Switch
                                        disabled={isPending}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormItem>
                                )}
                                />
                            )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SettingPage