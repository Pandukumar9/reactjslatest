'use client';
import { useState } from 'react';
import Dialog from './Dialog';


export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  const openBasicDialog = () => {
    setUser(null);
    setIsOpen(true);
  };

  const openDialogWithParam = () => {
    setUser({ id: 101, name: 'Pandukumar' });
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 p-6">
      <button
        onClick={openBasicDialog}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        Open Normal Dialog
      </button>

      <button
        onClick={openDialogWithParam}
        className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700"
      >
        Open Dialog with Parameters
      </button>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-bold mb-2">Dialog</h2>
        {user ? (
          <p className="text-gray-700">
            User ID: {user.id}, Name: {user.name}
          </p>
        ) : (
          <p className="text-gray-600">This is a normal dialog without parameters.</p>
        )}
      </Dialog>
    </div>
  );
}
