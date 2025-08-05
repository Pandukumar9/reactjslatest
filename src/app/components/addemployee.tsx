'use client';

import React, { useState, useEffect } from 'react';
import { Employee } from '../models/types';
import { addEmployee, updateEmployee } from '../utils/api';

interface Props {
  initialData?: Employee;
  onSuccess: () => void;
  viewMode?: boolean;
}

export default function AddEmployee({ initialData, onSuccess, viewMode }: Props) {

    const formFields = [ /* your form field loop remains unchanged */ 
          ['username', 'Username'],
          ['mobile', 'Mobile'],
          ['email', 'Email'],
          ['aadhar', 'Aadhar'],
          ['college', 'College'],
          ['branch', 'Branch'],
          ['passedOutYear', 'Passed Out Year'],
          ['hallTicket', 'Hall Ticket'],
    ];
    
  const [form, setForm] = useState<Employee>({
    username: '',
    mobile: '',
    email: '',
    aadhar: '',
    college: '',
    branch: '',
    passedOutYear: '',
    hallTicket: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.mobile.match(/^\d{10}$/)) newErrors.mobile = 'Mobile must be 10 digits';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email format';
    if (!form.aadhar.match(/^\d{12}$/)) newErrors.aadhar = 'Aadhar must be 12 digits';
    if (!form.college.trim()) newErrors.college = 'College is required';
    if (!form.branch.trim()) newErrors.branch = 'Branch is required';
    if (!form.passedOutYear.match(/^\d{4}$/)) newErrors.passedOutYear = 'Year must be 4 digits';
    if (!form.hallTicket.trim()) newErrors.hallTicket = 'Hall Ticket is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (initialData && initialData.id !== undefined) {
           await updateEmployee(initialData.id, form);
      } else {
           await addEmployee(form);
     }
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const inputStyle = (field: string) => 
    `border px-3 py-2 rounded w-full ${errors[field] ? 'border-red-500' : ''} ${viewMode ? 'bg-gray-100' : ''}`;

  const getTitle = () => {
    if (viewMode) return 'View Employee';
    if (initialData) return 'Edit Employee';
    return 'Add Employee';
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-6 py-3 border-b">
        <h2 className="text-xl font-semibold">{ getTitle() }</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full max-h-[400px] overflow-auto">
      {
         formFields.map(([name, label]) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type="text"
              name={name}
              value={(form[name as keyof Employee] || '')}
              onChange={handleChange}
              disabled={viewMode}
              className={inputStyle(name)}
            />
            { 
               errors[name] && <p className="text-red-500 text-sm mt-1">{ errors[name] }</p> 
            }
          </div>
        ))
      }

      {
        !viewMode && (
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            { initialData ? 'Update Employee' : 'Add Employee' }
          </button>
        )
      }
      </form>
    </div>
  );
}
