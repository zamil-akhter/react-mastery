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
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
