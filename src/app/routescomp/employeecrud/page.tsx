'use client';
import React, { useEffect, useState } from 'react';
import AddEmployee from "../../components/addemployee";
import EmployeeList from "../../components/EmployeeList";
import { Employee } from "../../models/types";
import { fetchEmployees } from "../../utils/api";

export default function EmployeesData() {

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
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6 text-center">Employee Management</h1>
        
              {/* <AddEmployee onSuccess={loadEmployees} /> */}
        
              {loadingEmployees && <p className="text-center mt-4">Loading employees...</p>}
              {errorEmployees && <p className="text-center text-red-500 mt-4">{errorEmployees}</p>}
        
              <EmployeeList employees={employees} />
            </div>
        </>
    )
}