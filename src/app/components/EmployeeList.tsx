'use client';

import React, { useEffect, useState } from 'react';
import Dialog from './Dialog';
import AddEmployee from './addemployee';
import { Employee } from '../models/types';
import { deleteEmployee, getEmployees } from '../utils/api';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<Employee>();
  const [viewMode, setViewMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 2;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const openDialogWithParam = (employee?: Employee, isView = false) => {
    setUser(employee);
    setViewMode(isView);
    setIsOpen(true);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const indexOfLastEmp = currentPage * employeesPerPage;
  const indexOfFirstEmp = indexOfLastEmp - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmp, indexOfLastEmp);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Employee List</h2>
          <button
            onClick={() => openDialogWithParam(undefined, false)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Employee
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name..."
          className="mb-4 px-3 py-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Mobile</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Aadhar</th>
                <th className="py-2 px-4 border">College</th>
                <th className="py-2 px-4 border">Branch</th>
                <th className="py-2 px-4 border">Year</th>
                <th className="py-2 px-4 border">Hall Ticket</th>
                <th className="py-2 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="py-2 px-4 border">{emp.username}</td>
                    <td className="py-2 px-4 border">{emp.mobile}</td>
                    <td className="py-2 px-4 border">{emp.email}</td>
                    <td className="py-2 px-4 border">{emp.aadhar}</td>
                    <td className="py-2 px-4 border">{emp.college}</td>
                    <td className="py-2 px-4 border">{emp.branch}</td>
                    <td className="py-2 px-4 border">{emp.passedOutYear}</td>
                    <td className="py-2 px-4 border">{emp.hallTicket}</td>
                    <td className="py-2 px-4 border">
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={() => openDialogWithParam(emp, true)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openDialogWithParam(emp, false)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => emp.id !== undefined && handleDelete(emp.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm w-[96px] text-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Dialog with Add/Edit/View */}
      <Dialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setViewMode(false);
        }}
      >
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
