import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthButton from "./components/AuthButton"

export default async function Home() {
  const supaBase = createServerComponentClient({cookies})
  const {data: post} = await supaBase.from("post").select()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h2>hola</h2>
        <AuthButton></AuthButton>
        <pre> {JSON.stringify(post,null,2)} </pre>
    </main>
  )
}

