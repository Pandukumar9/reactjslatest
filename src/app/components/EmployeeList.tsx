'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dialog from './Dialog';
import AddEmployee from './addemployee';

interface Employee {
  id: number;
  username: string;
  mobile: string;
  email: string;
  aadhar: string;
  college: string;
  branch: string;
  passedOutYear: string;
  hallTicket: string;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<Employee>();
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get<Employee[]>('http://localhost:3001/employees');
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this employee?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const openDialogWithParam = (employee?: Employee, isView: boolean = false) => {
    setUser(employee);
    setViewMode(isView);
    setIsOpen(true);
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Employee List
          <button
            onClick={() => openDialogWithParam(undefined, false)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>
        </h2>

        <input
          type="text"
          placeholder="Search by name..."
          className="mb-4 px-3 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Aadhar</th>
              <th className="py-2 px-4 border">College</th>
              <th className="py-2 px-4 border">Branch</th>
              <th className="py-2 px-4 border">Year</th>
              <th className="py-2 px-4 border">Hall Ticket</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="py-2 px-4 border">{emp.username}</td>
                <td className="py-2 px-4 border">{emp.mobile}</td>
                <td className="py-2 px-4 border">{emp.email}</td>
                <td className="py-2 px-4 border">{emp.aadhar}</td>
                <td className="py-2 px-4 border">{emp.college}</td>
                <td className="py-2 px-4 border">{emp.branch}</td>
                <td className="py-2 px-4 border">{emp.passedOutYear}</td>
                <td className="py-2 px-4 border">{emp.hallTicket}</td>
                <td className="py-2 px-4 border flex gap-2">
                  <button
                    onClick={() => openDialogWithParam(emp, true)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openDialogWithParam(emp, false)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog isOpen={isOpen} onClose={() => { setIsOpen(false); setViewMode(false); }}>
        <AddEmployee
          initialData={user}
          onSuccess={() => {
            fetchEmployees();
            setIsOpen(false);
            setViewMode(false);
          }}
          viewMode={viewMode}
        />
      </Dialog>
    </>
  );
}
