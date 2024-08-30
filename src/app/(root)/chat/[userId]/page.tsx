"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ChatWindow from "../../components/ChatWindow";
import { Card } from "@/components/ui/card";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const userId = params.userId as string;

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Card className="w-[750px] bg-slate-50 my-4 h-auto max-h-[500px] min-h-[500px] overflow-y-auto">
        {/* <h1 className="text-4xl font-bold mb-8">Chat with {user.firstName}</h1> */}
        <div className="w-full">
          <ChatWindow user={user} />
        </div>
      </Card>
    </main>
  );
}
