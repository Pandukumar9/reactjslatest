import axios from 'axios';
import { Employee } from '../models/types';

export const API_URL = 'http://localhost:3001/employees';

// fetchEmployees returns an array of employees from the response data
export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return response.data; // unwrap data directly
};

// addEmployee returns the added employee from the response data
export const addEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.post<Employee>(API_URL, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export async function updateEmployee(id: number, data: any) {
  // Remove `id` from payload
  const { id: _, ...dataWithoutId } = data;

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataWithoutId),
  });

  if (!res.ok) throw new Error('Failed to update employee');
  return res.json();
}
