import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthButton from "./components/AuthButton-client"
import AuthButtonServer from "./components/AuthButton-server"
import { redirect } from "next/navigation"

export default async function Home() {
  const supaBase = createServerComponentClient({cookies})
  const {data : {session}} = await supaBase.auth.getSession()

  if(session === null) redirect("/login")

  const {data: post} = await supaBase.from("post").select("*")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>hola</h2>
        <AuthButtonServer></AuthButtonServer>
        <pre> {JSON.stringify(post,null,2)} </pre>
    </main>
  )
}

