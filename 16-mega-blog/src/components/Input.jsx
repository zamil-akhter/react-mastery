import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3.5 py-2.5 border rounded-xl bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 duration-200 border-slate-300 shadow-2xs ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
