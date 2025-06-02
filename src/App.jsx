
import Navbar from "./components/Navbar"; // Added Navbar import
import Footer from "./components/Footer"; // Added Footer import
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AdminPanel from "./pages/AdminPanel";
import FullItemDetails from "./pages/FullItemDetails";
import PaymentPage from "./pages/PaymentPage"; // Added PaymentPage import
import BookList from "./adminDashboard/BookList.jsx"; // For AdminPanel nested route
import AddBookForm from "./adminDashboard/AddBookForm.jsx"; // For AdminPanel nested route
import OrderList from "./adminDashboard/OrderList.jsx"; // For AdminPanel nested route

function App() {
  const [authUser] = useAuth();
  console.log("AuthUser in App.jsx:", authUser);
  const isAdmin = authUser && authUser.role === 'admin';
  console.log("Is Admin:", isAdmin);

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar /> {/* Added Navbar component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course/:id" element={<FullItemDetails />} />
          <Route path="/payment" element={<PaymentPage />} /> {/* Added PaymentPage route */}

          {/* Admin Dashboard Routes */}
          {isAdmin ? (
            <Route path="/dashboard" element={<AdminPanel />}>
              <Route index element={<Navigate to="books" replace />} /> {/* Default to books list */}
              <Route path="books" element={<BookList />} />
              <Route path="add-book" element={<AddBookForm />} />
              <Route path="orders" element={<OrderList />} />
            </Route>
          ) : (
            // Temporarily render text instead of redirect to confirm if this branch is hit
            <Route path="/dashboard" element={<div>Access Denied. You are not an admin. AuthUser: {JSON.stringify(authUser)}</div>} />
            // <Route path="/dashboard" element={<Navigate to="/" />} /> // Original redirect
          )}
        </Routes>
        <Toaster />
        <Footer /> {/* Added Footer component */}
      </div>
    </>
  );
}

export default App;
