import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwright/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeContext } from "./context/ThemeContextProvider";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("Logged in user:", userData);
          dispatch(login(userData));
        } else {
          console.log("No user is currently logged in.");
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
    </div>
  );
}

export default App;
