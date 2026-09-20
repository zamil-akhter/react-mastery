import React from 'react'

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-2 select-none" style={{ minWidth: width }}>
      <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 text-base font-black">
        M
      </span>
      <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
        MegaBlog
      </span>
    </div>
  );
}

export default Logo