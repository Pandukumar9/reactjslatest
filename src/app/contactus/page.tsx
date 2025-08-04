'use client';
import React, { useEffect, useState } from 'react';
import Users from '../components/users';
import ReuseButton from '../components/reusebutton';
import AddEmployee from '../components/addemployee';
import EmployeeList from '../components/EmployeeList';
import { fetchEmployees } from '../utils/api';
import { Employee } from '../models/types';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function ContactUs() {
  const [showList, setShowList] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const contacts = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ];

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);


  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [errorEmployees, setErrorEmployees] = useState<string | null>(null);

  const loadEmployees = async () => {
    setLoadingEmployees(true);
    setErrorEmployees(null);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      setErrorEmployees((error as Error).message);
    } finally {
      setLoadingEmployees(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

        <button
          onClick={() => setShowList(!showList)}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showList ? 'Hide Contacts' : 'Show Contacts'}
        </button>

        {showList && (
          <ul className="space-y-2">
            {contacts.map((contact, index) => (
              <li key={index} className="p-3 border rounded shadow">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-gray-600">{contact.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-4 rounded-lg shadow">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm">{user.company.name}</p>
            </li>
          ))}
        </ul>
      </div>
       <Users />

        <div className="space-y-4 p-6">
               <ReuseButton
                 label="Submit"
                 className="bg-blue-600 hover:bg-blue-700"
                 onClick={() => alert('Submit clicked!')}
               />
       
               <ReuseButton
                 label="Delete"
                 className="bg-red-500 hover:bg-red-600"
                 onClick={() => alert('Delete clicked!')}
               />
       
               <ReuseButton
                 label="Custom Button"
                 className="bg-purple-600 hover:bg-purple-700 text-sm"
               />
             </div>

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Management</h1>

      <AddEmployee onSuccess={loadEmployees} />

      {loadingEmployees && <p className="text-center mt-4">Loading employees...</p>}
      {errorEmployees && <p className="text-center text-red-500 mt-4">{errorEmployees}</p>}

      <EmployeeList employees={employees} />
    </div>
    </>
  );
}
