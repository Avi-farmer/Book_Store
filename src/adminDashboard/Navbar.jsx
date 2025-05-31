import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">📚 BookStore</h1>
      <Link to='/' className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Logout
      </Link>
    </div>
  );
}
