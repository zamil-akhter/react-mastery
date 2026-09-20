import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwright/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
