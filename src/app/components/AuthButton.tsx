"use client"

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {GitHubIcon} from "./GitHubIcon"
import "./GitHubIcon.css"
import { useEffect, useState } from "react"


export default function AuthButton() {
    const [sesion, setsesion] = useState<Session | null>(null)
    const supabase = createClientComponentClient()

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
    }

    useEffect(() => {
      const getSesion = async () =>{
        const {data} = await supabase.auth.getSession()
        setsesion(data.session)
      }
      getSesion()
    }, [])
      
  return (
    <div>
        { sesion === null ?
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
