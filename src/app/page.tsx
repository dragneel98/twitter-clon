import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import PostList from "./components/postList"
import { Database } from "./types/database"
import { CreatePost } from "./components/create-post"
import Chat from "./chat/chat"
import UserColum from "./components/UserColum"

export default async function Home() {
  const supaBase = createServerComponentClient<Database>({cookies})
  const {data : {session}} = await supaBase.auth.getSession()

  if(session === null) redirect("/login")

  const {data: posts} = await supaBase.from("post").select("*, users(*)")
  const users = await supaBase.from("users").select("*, users(*)")

  return (
    <main className="grid grid-cols-3 gap-4 min-h-screen justify-between p-4">
      <UserColum user={users}></UserColum>
        <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen ">
          <CreatePost userAvatarUrl={ session?.user?.user_metadata?.avatar_url}/>
          <PostList posts={posts}/>
        </section>
        <Chat></Chat>
    </main>
  )
}

