import { useContext, useState, createContext } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  const toggleTheme = () => {
      const newTheme = setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      localStorage.setItem("theme", newTheme);
      return newTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
