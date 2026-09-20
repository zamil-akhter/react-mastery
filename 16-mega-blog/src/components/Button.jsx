import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-indigo-600 hover:bg-indigo-700",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium shadow-xs hover:shadow transition-all duration-200 active:scale-[0.98] ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
