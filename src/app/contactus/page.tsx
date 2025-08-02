'use client';
import React, { useState } from 'react';

export default function ContactUs() {
  const [showList, setShowList] = useState(true);

  const contacts = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
  ];

  return (
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
  );
}
