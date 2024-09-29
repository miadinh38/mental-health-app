"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuthenticationService } from "../app/services/authService";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
});

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || null;
    }
    return null;
  });
  const [isAuth, setIsAuth] = useState(!!token);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Logout funtion
  const logout = () => {
    setCurrentUser(null);
    setIsAuth(false);
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Check authentication based on token
  const checkAuthentication = async (token) => {
    if (!token) {
      setIsAuth(false);
      setCurrentUser(null);
      return;
    }

    try {
      const response = await checkAuthenticationService(token);

      if (response.data.success === true) {
        setIsAuth(true);
        setCurrentUser(response.data.user);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error from check Authentication: ", error.message);
    }
  };

  // Effect to verify authentication on component mount
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthentication(token);
      setLoading(false);
    };
    verifyAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ logout, isAuth, currentUser, setIsAuth, checkAuthentication }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;