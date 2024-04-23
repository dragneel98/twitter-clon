'use client'

import { addPost } from '../actions/actions'
import { useRef } from 'react'
import CreatePostButton from './create-post-button'
import style from "./create-post.module.css"

export function CreatePost ({
  userAvatarUrl
}: {
  userAvatarUrl: string
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={async (formData) => {
      await addPost(formData)
      formRef.current?.reset() 
    }} className='flex flex-row p-3 border-b border-white/20'>
      
      <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} />
      <div className='flex flex-1 flex-col gap-y-4'>
      <textarea
        name='content'
        rows={4}
        className={style.textarea}
        placeholder='¡¿Qué está pasando!?'
      ></textarea>
        <CreatePostButton/>
      </div>
    </form>
  )
}