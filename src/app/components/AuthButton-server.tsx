import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import AuthButton from "./AuthButton-client"
import { cookies } from "next/headers"

export default async function AuthButtonServer() {
    const supabase = createServerComponentClient({cookies})
    const {data : {session}} = await supabase.auth.getSession()

  return (
    <AuthButton session={session}></AuthButton>
  )
}
