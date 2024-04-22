"use client"

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import style from "./chat.module.css"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  async function fetchMessages() {
    const { data: messages, error } = await supabase.from('messages').select('*').order('created_at');
    if (messages) setMessages(messages)
    else console.log('Error fetching messages:', error)
  }

  const handleInserts = (payload) => {
    setMessages(prev => [...prev, payload.new])
    console.log('Change received!', payload)
  }

  useEffect(() => {
    fetchMessages();
    supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, handleInserts)
      .subscribe()
  }, []);

  const handleMessageSubmit = async e => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('messages').insert([
      { id: uuidv4(), content: newMessage }
    ]);

    if (error) {
      console.error('Error sending message:', error.message);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className={style.container}>
      <button className={style.closeButton}>cerrar</button>
      <div className={style.messages}>
        {messages.map(message => (
          <div key={message.id} >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className={style.form}>
        <input
          type="text"
          className={style.inputMessage}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
