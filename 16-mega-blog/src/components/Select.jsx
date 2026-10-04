import { forwardRef, useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-3 focus:ring-indigo-100 dark:focus:ring-indigo-900/40 duration-200 shadow-2xs ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
