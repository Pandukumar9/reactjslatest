// ReusableTable.tsx
import React from 'react';
import { Column } from '../models/types';

type ReusableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function ReusableTable<T>({ data, columns }: ReusableTableProps<T>) {
  return (
    <table className="min-w-full border border-gray-300 rounded">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className="text-left px-4 py-2 border">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={rowIdx} className="border-t hover:bg-gray-50">
            {columns.map((col, colIdx) => (
              <td key={colIdx} className="px-4 py-2 border">
                {col.cell ? col.cell(row) : String(row[col.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
