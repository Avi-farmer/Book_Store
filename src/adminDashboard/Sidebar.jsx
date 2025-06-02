import { Link, useLocation } from 'react-router-dom';
import { Package, PlusCircle, ShoppingCart } from 'lucide-react'; // Example icons

export default function Sidebar() {
  const location = useLocation();

  const linkClasses = "flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-150";
  const activeLinkClasses = "bg-gray-700 text-white";

  return (
    <aside className="w-64 h-full bg-gray-800 text-white flex flex-col p-4 shadow-lg"> {/* Use h-full for fixed sidebar */}
      <div className="px-2 py-4 mb-4 border-b border-gray-700">
        <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
      </div>
      <nav className="flex flex-col gap-2">
        <Link
          to="books"
          className={`${linkClasses} ${location.pathname.endsWith('/books') || location.pathname.endsWith('/dashboard') ? activeLinkClasses : ''}`}
        >
          <Package size={20} className="mr-3" />
          Books List
        </Link>
        <Link
          to="add-book"
          className={`${linkClasses} ${location.pathname.endsWith('/add-book') ? activeLinkClasses : ''}`}
        >
          <PlusCircle size={20} className="mr-3" />
          Add Book
        </Link>
        <Link
          to="orders"
          className={`${linkClasses} ${location.pathname.endsWith('/orders') ? activeLinkClasses : ''}`}
        >
          <ShoppingCart size={20} className="mr-3" />
          Orders
        </Link>
      </nav>
    </aside>
  );
}

// No more propTypes needed as setView is removed
