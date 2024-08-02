"use client"


import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import {Button} from "../ui/button"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/schemas/login"
import { Input } from "../ui/input"
import { FormError } from "../form-error"
import { FormSuccess } from '../form-success'
import { login } from "@/actions/login"
import { useTransition, useState } from "react"
import { useSearchParams } from "next/navigation";
import Link from "next/link";


export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : ""
  const [ isPending, startTransition ] = useTransition()
  const [ success, setSuccess ] = useState<string | undefined>("")
  const [ error, setError ] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values : z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(()=>{
      login(values)
      .then((data)=>{
        setError(data?.error)
        //TODO: when we add 2FA
        setSuccess(data?.success)
      })
    })
      
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              control = {form.control}
              name = "email"
              render = {({field}) => (
                <FormItem>
                  <FormLabel >Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="johndoe@example.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
            )}
            />

            <FormField 
            name = "password"
            control = {form.control}
            render = {({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field}
                  placeholder="******"
                  type="password"
                  disabled={isPending}
                  />
                </FormControl>
                <Button variant={"link"} size={'sm'} className="p-0 font-normal" asChild >
                    <Link href={"/auth/reset"}>
                      Forgot Password?
                    </Link>
                </Button>
                <FormMessage />
              </FormItem>
            )}
            />   
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success}/>
          <Button type='submit' className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
