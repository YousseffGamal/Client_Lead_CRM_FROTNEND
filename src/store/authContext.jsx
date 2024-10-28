import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    paymentMethodVerified:
      localStorage.getItem("paymentMethodVerified") === "true",
  });

  const login = async (cred) => {
    try {
      const { data } = await axiosInstance.post("/signin", cred);
      console.log(data);

      setAuth({
        token: data.user.token,
        user: data.user.userExist,
        paymentMethod: data.user.userExist.paymentMethod != null ? true : false,
      });
      localStorage.setItem("token", data.user.token);
      localStorage.setItem(
        "paymentMethodVerified",
        data.user.userExist.paymentMethod != null ? "true" : "false"
      );
      localStorage.setItem("user", JSON.stringify(data.user.userExist));
      console.log("from auth", auth);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    axiosInstance
      .post("logout")
      .then((res) => {
        setAuth({ token: "", user: "" }); // Reset permissions state
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .catch((err) => {
        setAuth({ token: "", user: "" }); // Reset permissions state
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  };

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or unauthorized

          logout(); // Logout the user and redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
