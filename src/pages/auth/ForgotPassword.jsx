import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    toast.success(`Reset link sent to ${data.email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Your Password</h2>
        <input {...register("email")} type="email" placeholder="Email" className="w-full border p-2 mb-4 rounded" />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
