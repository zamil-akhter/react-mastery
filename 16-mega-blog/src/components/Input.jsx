import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 duration-200 shadow-2xs ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
