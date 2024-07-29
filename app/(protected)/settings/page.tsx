import { auth, signOut } from "@/auth" 

const SettingPage = async () => {
    const session = await auth()
    return (
        <div>
            {JSON.stringify(session)}
            <form action={async ()=>{
                "use server"
                await signOut()
            }}>
                <button type="submit" className="m-5 p-3 text-white bg-gray-800">Sign out</button>
            </form>
        </div>
    )
}

export default SettingPage