"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {GitHubIcon} from "./GitHubIcon"
import "./GitHubIcon.css"

export default function AuthButton() {
    const supabase = createClientComponentClient()

    const handleSignIn = async () => {
        console.log("hola");
        
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
  return (
    <div>
        <button className="button" onClick={handleSignIn}>
        <GitHubIcon/>
        Continue with Github
        </button>
      
        <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}
