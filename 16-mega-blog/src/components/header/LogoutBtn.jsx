import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwright/auth";
import { logout } from "../../store/authSlice";
import { toast } from "react-toastify";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success("You have been logged out successfully.");
    });
  };
  return (
    <button
      className="cursor-pointer inline-block px-4 py-2 text-sm font-medium rounded-xl text-rose-600 hover:text-white hover:bg-rose-600 transition-all duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
