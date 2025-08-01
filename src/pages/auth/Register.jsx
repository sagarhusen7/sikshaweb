import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../store/slices/authSlice";
import { registerUser } from "../../services/authService";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      // ✅ Call backend to register user
      const res = await registerUser(formData); // expects { user, token }

      // ✅ Save to Redux
      dispatch(loginSuccess(res));

      // ✅ Save to localStorage to persist session manually
      localStorage.setItem("auth", JSON.stringify(res));
      localStorage.setItem("siksha_user", JSON.stringify(res.user));
      localStorage.setItem("siksha_token", res.token);

      // ✅ Toast
      toast.success("Registration successful!");

      // ✅ Redirect based on role
      const role = res.user.role;
      if (role === "admin") {
        navigate("/dashboard/admin");
      } else if (role === "instructor") {
        navigate("/dashboard/instructor");
      } else {
        navigate("/dashboard/student");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1d2b64] via-[#f8cdda] to-[#1d2b64] bg-[length:400%_400%] animate-[bgSlide_12s_ease_infinite]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/20 p-10 rounded-3xl"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Create Your SikshaWeb Account
        </h2>

        <div className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
          />

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
          />

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
          />

          <select
            {...register("role", { required: true })}
            className="w-full px-4 py-3 bg-white/20 text-white rounded-xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition duration-200 shadow-lg"
        >
          Register
        </button>
      </form>

      <style>{`
        @keyframes bgSlide {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
