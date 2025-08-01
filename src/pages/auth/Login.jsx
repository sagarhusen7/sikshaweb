import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      // ✅ 1. Send login data to backend
      const res = await loginUser({ email, password }); // returns { user, token }

      // ✅ 2. Update Redux store
      dispatch(loginSuccess(res)); // sets isAuthenticated true

      // ✅ 3. Save to localStorage (authSlice already handles this via reducer)

      // ✅ 4. Success toast
      toast.success("Logged in successfully!");

      // ✅ 5. Navigate to role-based dashboard
      const role = res.user.role;
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "instructor") {
        navigate("/dashboard/instructor");
      } else {
        navigate("/dashboard/student");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-200 to-blue-300 animate-gradient-x" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 bg-white/80 dark:bg-gray-900/80 shadow-2xl p-10 rounded-3xl w-full max-w-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Sign In to SikshaWeb
        </h2>

        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5"
        >
          Login
        </button>

        <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline transition-colors"
          >
            Register
          </Link>
        </p>
      </form>

      {/* Decorative Blurs */}
      <div className="hidden sm:block absolute -top-20 -left-20 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute -bottom-20 -right-20 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />
    </div>
  );
}
