import { useState } from 'react';
import Sidebar from '../adminDashboard/Sidebar';
import Navbar from '../adminDashboard/Navbar';
import AddBookForm from '../adminDashboard/AddBookForm';
import BookList from '../adminDashboard/BookList';

export default function AdminPanel() {
  const [view, setView] = useState('books');

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-gray-800 text-white fixed h-screen z-10">
        <Sidebar setView={setView} />
      </div>

      <div className="flex flex-col flex-1 ml-64">
        <div className="fixed top-0 left-64 right-0 z-10 bg-white shadow">
          <Navbar />
        </div>

        <div className="mt-16 p-6 overflow-y-auto h-screen">
          {view === 'books' ? <BookList /> : <AddBookForm />}
        </div>
      </div>
    </div>
  );
}
