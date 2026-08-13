import React from "react";
import { useThemeContext } from "../context/ThemeContextProvider";

function Navbar() {
  const { theme } = useThemeContext();
  return (
    <nav className="navbar">
      <span>Current Theme: {theme}</span>
    </nav>
  );
}

export default Navbar;
