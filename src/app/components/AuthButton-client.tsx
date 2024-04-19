"use client"

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {GitHubIcon} from "./GitHubIcon"
import "./GitHubIcon.css"
import { useRouter } from "next/navigation"


export default function AuthButton({session}: {session : Session | null}) {
    // const [sesion, setsesion] = useState<Session | null>(null)
    const supabase = createClientComponentClient()
    const router = useRouter()
    // console.log(session);
    
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider:"github",
            options:{
                redirectTo:'http://localhost:3000/auth/callback'
            }
        })
    }
    const handleSignOut = async () =>{
        await supabase.auth.signOut()
        router.refresh()
    }
      
  return (
    <div>
        { session === null ?
        <button className="button" onClick={handleSignIn}>
        <GitHubIcon/>
        Continue with Github
        </button>
        :
        <button className="button" onClick={handleSignOut}>Sign out</button>
        }
    </div>
  )
}
