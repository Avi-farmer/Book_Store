export default function Sidebar({ setView }) {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white flex flex-col p-6 shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-4">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <button
          onClick={() => setView('books')}
          className="px-4 py-2 text-left bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          📚 Books List
        </button>
        <button
          onClick={() => setView('add')}
          className="px-4 py-2 text-left bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          ➕ Add Book
        </button>
      </nav>
    </aside>
  );
}
