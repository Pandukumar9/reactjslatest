// components/UserList.tsx
'use client';

import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import SkeletonCard from "./SkeletonCard";
import { User } from "../models/user";
import PageWithDialog from "./PageWithDialog";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Users</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      </div>

      <PageWithDialog />
    </>
  );
}
