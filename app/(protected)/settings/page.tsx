"use client"
import { signOut, useSession } from "next-auth/react"





const SettingPage = () => {
    const session = useSession()
    const onClick = () => {
        signOut()
    }
    return (
        <div>
            {JSON.stringify(session)}
                <button onClick={onClick} type="submit" className="m-5 p-3 text-white bg-gray-800 rounded-lg">Sign out</button>
        </div>
    )
}

export default SettingPage