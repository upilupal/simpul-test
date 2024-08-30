'use client';
import { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IoChevronBackOutline } from "react-icons/io5";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

interface ChatWindowProps {
  user: User;
}

export default function ChatWindow({ user }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch initial messages from API
    fetch(`https://dummyjson.com/comments?limit=5`)
      .then(res => res.json())
      .then(data => {
        const formattedMessages = data.comments.map((comment: any) => ({
          id: comment.id,
          text: comment.body,
          sender: Math.random() > 0.5 ? 'user' : 'other',
        }));
        
        // Retrieve last message from localStorage
        const lastMessage = localStorage.getItem(`lastMessage_${user.id}`);
        if (lastMessage) {
          formattedMessages.push(JSON.parse(lastMessage));
        }
        
        setMessages(formattedMessages);
      });
  }, [user.id]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'user' as const,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Store the last message in localStorage
    localStorage.setItem(`lastMessage_${user.id}`, JSON.stringify(newMessage));

    // Fetch a new message after 3 seconds
    setTimeout(() => {
      fetchNewMessage();
    }, 3000);
  };

  const fetchNewMessage = () => {
    fetch('https://dummyjson.com/comments/random')
      .then(res => res.json())
      .then(data => {
        const newMessage = {
          id: Date.now(),
          text: data.body,
          sender: 'other' as const,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
  };

  return (
    <div className="bg-white rounded-lg shadow h-[600px] flex flex-col">
      <div className="p-4 bg-gray-100 rounded-t-lg flex items-center gap-2">
          <Link href={"/"}>
          <IoChevronBackOutline size={24}/>
          </Link>  
        <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}