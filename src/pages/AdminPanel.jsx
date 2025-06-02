import { Outlet } from 'react-router-dom';
import Sidebar from '../adminDashboard/Sidebar';

export default function AdminPanel() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white fixed h-full z-30"> {/* Increased z-index for sidebar */}
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-64"> {/* Adjust ml to match sidebar width */}
        {/* Top Navbar (Admin's Navbar) */}
        {/* Ensure this navbar has a defined height, e.g., h-16 or h-20 */}

        {/* Page content */}
        {/* Adjust pt (padding-top) to match the navbar's height */}
        <main className="pt-16 p-4 md:p-6 overflow-y-auto flex-1"> {/* Changed mt-16 to pt-16 */}
          <Outlet /> {/* Nested routes will render here */}
        </main>
      </div>
    </div>
  );
}
