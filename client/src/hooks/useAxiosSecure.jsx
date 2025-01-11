import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


 const axiosSecure = axios.create({
  baseURL: "https://b10a11-server-side-abdurrahmanmahmud5981.vercel.app",
  // baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.error(
          "error caught from our very own axios interceptor-->",
          error.response
        );
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          logOut();
          // navigate to login
          navigate("/login");
        }
      }
    );
  }, [logOut, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;