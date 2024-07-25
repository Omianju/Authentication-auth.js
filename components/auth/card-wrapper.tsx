"use client"
import { Card, CardHeader, CardFooter, CardContent } from '../ui/card'
import { BackButton } from './back-button'
import { Header } from './header'
import { Social } from './social'


interface CardWrapperProps {
    children : React.ReactNode
    headerLabel : string
    backButtonLabel : string
    backButtonHref : string
    showSocials? : boolean 
}


export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocials
}:CardWrapperProps) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader >
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {
                showSocials && (
                    <CardFooter>
                        <Social/>
                    </CardFooter>
                )
            }
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}