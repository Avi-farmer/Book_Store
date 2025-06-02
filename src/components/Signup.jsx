import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, userInfo);
      if (res.data) {
        toast.success("Signup Successfully");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600"
              {...register("fullname", { required: true })}
              placeholder="Enter your full name"
            />
            {errors.fullname && <span className="text-red-500 text-sm">Full name is required</span>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 dark:text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600"
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          {/* Login link */}
          <p className="text-center mt-4 text-sm dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 underline dark:text-blue-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
