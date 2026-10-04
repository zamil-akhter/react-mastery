import React, { useState } from "react";
import { Button, Input, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwright/auth";
import { login } from "../store/authSlice";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        toast.success("Your account has been successfully created");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="mb-4 flex justify-center">
          <Logo width="auto" />
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Sign up to create account</h2>
        <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?&nbsp;
          <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 hover:underline">
            Sign In
          </Link>
        </p>
        {error && (
          <div className="mt-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
