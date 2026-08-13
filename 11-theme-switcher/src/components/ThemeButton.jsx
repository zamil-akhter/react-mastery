import React from "react";
import { useThemeContext } from "../context/ThemeContextProvider";

function ThemeButton() {
  const { theme, toggleTheme } = useThemeContext();
  return <button onClick={toggleTheme}>Swith to {theme === "light" ? "dark" : "light"}</button>;
}

export default ThemeButton;
