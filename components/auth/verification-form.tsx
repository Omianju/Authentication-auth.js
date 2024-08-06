"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/newVerification"
import { FormSuccess } from "../form-success"
import { FormError } from "../form-error"


export const NewVerificationForm = () => {
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(()=>{
        if (!token) return setError("Token is missing!")
        
        newVerification(token)
        .then((data)=>{
            setSuccess(data?.success)
            setError(data?.error)
        })
        .catch(()=>{
            setError("Something went wrong!")
        })
    }, [token, success, error])

    useEffect(()=>{
        onSubmit()
    },[onSubmit])

    return (
        <CardWrapper
         headerLabel="Confirming your verification!"
         backButtonLabel="Back to login."
         backButtonHref="/auth/login"
         >
        <div className="w-full flex items-center justify-center " >    
           
            { !error && !success && (
                <BeatLoader />
            ) }
            
            <FormSuccess message={success} />
            <FormError message={error} />
        </div>
        </CardWrapper>
    )
}