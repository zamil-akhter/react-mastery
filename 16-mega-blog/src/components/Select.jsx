import { forwardRef, useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3.5 py-2.5 border rounded-xl bg-white text-slate-900 outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100 duration-200 border-slate-300 shadow-2xs ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
