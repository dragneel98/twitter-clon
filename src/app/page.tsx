import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthButtonServer from "./components/AuthButton-server"
import { redirect } from "next/navigation"
import PostList from "./components/postList"
import { Database } from "./types/database"
import { CreatePost } from "./components/create-post"
import Chat from "./chat/chat"

export default async function Home() {
  const supaBase = createServerComponentClient<Database>({cookies})
  const {data : {session}} = await supaBase.auth.getSession()

  if(session === null) redirect("/login")

  const {data: posts} = await supaBase.from("post").select("*, users(*)")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen ">
          <AuthButtonServer></AuthButtonServer>
          <CreatePost userAvatarUrl={ session?.user?.user_metadata?.avatar_url}/>
          <PostList posts={posts}/>
        </section>
        <Chat></Chat>
    </main>
  )
}

