import React from 'react';
import { User } from '../models/user';
import { ReusableTable } from './ReusableTable';
import { Column } from '../models/types';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
  { id: 2, name: 'Bob', email: 'bob@example.com', phone: '9876543210' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', phone: '5555555555' },
];

const columns: Column<User>[] = [
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Phone', accessor: 'phone' },
  {
    header: 'Action',
    accessor: 'id',
    cell: (user) => (
      <button
        className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => alert(`User: ${user.name}`)}
      >
        View
      </button>
    ),
  },
];

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <ReusableTable data={users} columns={columns} />
    </div>
  );
}
