"use client"


import { newPassword } from "@/actions/new-password";
import { NewPasswordSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "../form-error";
import { FormSuccess } from '../form-success';
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { CardWrapper } from "./card-wrapper";


export const NewPasswordForm = () => { 
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [ isPending, startTransition ] = useTransition()
  const [ success, setSuccess ] = useState<string | undefined>("")
  const [ error, setError ] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = (values : z.infer<typeof NewPasswordSchema>) => {
    setError("")
    setSuccess("")

    startTransition(()=>{
      newPassword(values, token as string)
      .then((data)=>{
        setError(data?.error)
        //TODO: when we add 2FA
        setSuccess(data?.success)
      })
    })
      
  }

  return (
    <CardWrapper
      headerLabel="Reset Your Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              control = {form.control}
              name = "password"
              render = {({field}) => (
                <FormItem>
                  <FormLabel >Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
            />  
          </div>
          <FormError message={error} />
          <FormSuccess message={success}/>
          <Button type='submit' className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
