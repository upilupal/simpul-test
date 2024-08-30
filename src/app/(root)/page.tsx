'use client';
import { useEffect } from 'react';
import UserList from './components/UserList';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Clear any previously selected user when returning to the main page
    localStorage.removeItem('selectedUser');
  }, []);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Simple Messaging App</h1>
      <Card className='w-[750px] bg-slate-50 my-4 h-auto max-h-[500px] min-h-[500px] overflow-y-auto'>
      <div className="w-full">
        <UserList />
      </div>

      </Card>

      <Button>
        <Link href={"/todoList"}>
        Go to Todolist
        </Link>
      </Button>
    </main>
  );
}