

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthHOC = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userAuth);
  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    if (!storedToken) {
      toast.error("Please login ");
      navigate("/");
    }
  }, [storedToken, navigate]);

  // If token exists, render children
  return storedToken ? children : null;
};

export default AuthHOC;
