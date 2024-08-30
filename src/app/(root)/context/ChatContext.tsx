'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
}

interface ChatContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  messages: { [userId: number]: Message[] };
  setMessages: React.Dispatch<React.SetStateAction<{ [userId: number]: Message[] }>>;
  sendMessage: (userId: number, text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<{ [userId: number]: Message[] }>({});

  useEffect(() => {
    // Load users from API
    fetch('https://dummyjson.com/users?limit=5')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        
        // Load messages from localStorage
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          // Initialize empty message arrays for each user
          const initialMessages: { [userId: number]: Message[] } = {};
          data.users.forEach((user: User) => {
            initialMessages[user.id] = [];
          });
          setMessages(initialMessages);
        }
      });

    // Load selected user from localStorage
    const storedSelectedUser = localStorage.getItem('selectedUser');
    if (storedSelectedUser) {
      setSelectedUser(JSON.parse(storedSelectedUser));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Save selected user to localStorage whenever it changes
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    }
  }, [selectedUser]);

  const sendMessage = (userId: number, text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
    };
    setMessages(prevMessages => ({
      ...prevMessages,
      [userId]: [...(prevMessages[userId] || []), newMessage],
    }));
  };

  return (
    <ChatContext.Provider value={{ users, setUsers, selectedUser, setSelectedUser, messages, setMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
