import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signupUser } from "../../store/actions";
import toast from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (registerData) => {
    dispatch(signupUser(registerData, toast, navigate));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-xl shadow-xl border border-neutral-800">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-neutral-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition"
          >
            Register
          </button>

          <Link
            to="/"
            className="w-full bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;