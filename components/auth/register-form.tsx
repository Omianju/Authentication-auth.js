"use client"


import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState, useTransition } from "react";


export const RegisterForm = () => {
  const [ isPending, startTransition ] = useTransition()
  const [ success, setSuccess ] = useState<string | undefined>("")
  const [ error, setError ] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      email: "",
      password: ""
    }
  })

  const onSubmit = (values : z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    startTransition(()=>{
      register(values)
      .then((data)=>{
        setError(data.error)
        setSuccess(data.success)
      })
    })
      
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField 
              name="name"
              control={form.control}
              render = {({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                    {...field}
                    placeholder="john"
                    disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                <FormMessage />
              </FormItem>
            )}
            />   
          </div>
          <FormError message={error} />
          <FormSuccess message={success}/>
          <Button type='submit' className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
