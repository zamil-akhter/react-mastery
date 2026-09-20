import { useState } from "react";
import { Button, Input, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as storeLogin } from "../store/authSlice";
import authService from "../appwright/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="mx-auto w-full max-w-lg bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
        <div className="mb-4 flex justify-center">
          <Logo width="auto" />
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && (
          <div className="mt-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
