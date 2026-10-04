import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, isAuthenticated = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    //let authValue = authStatus === true ? true : false

    if (isAuthenticated && authStatus !== isAuthenticated) {
      navigate("/login");
    } else if (!isAuthenticated && authStatus !== isAuthenticated) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, isAuthenticated]);
  return loader ? (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-9 h-9 border-3 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
    </div>
  ) : (
    <>{children}</>
  );
}

export default Protected;
