'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import User from './User';

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
}

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=5')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
      });
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold m-4">Messages</h2>
      {users.map(user => (
        <Link key={user.id} href={`/chat/${user.id}`}>
          <User user={user} />
        </Link>
      ))}
    </div>
  );
}