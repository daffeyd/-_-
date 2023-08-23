import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "./axiosInterceptor";
import { useCookies } from 'react-cookie';
import { CircularProgress } from '@mui/material'; 
import "./protectedroutes.css";


const ProtectedRoutes = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [cookies, setCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(true); // Add loading state


  const input = {
    email: cookies.email,
    token: cookies.token,
  };
  useEffect(() => {
    setTimeout(() => {

      if (input.email && input.token) {
        const fetchUserData = async () => {
          try {
            // Send a request to a secured route on your server
            const response = await axios.post('api/auth/secured-route', input);
            if (response.status === 200) {
              // alert(response.data.message);
              setCurrentUser({ email: input.email })
              // return children
            }
          } catch (error) {
            // alert("error.response.data.message");
            setCurrentUser(null)
          } finally {
            setLoading(false); // Set loading state to false regardless of success or error
          }
        };

        fetchUserData();
      } else {
        alert("cookie unavailable");
        setLoading(false);
        setCurrentUser(null)
      }
    },)
  }, []);
  if (loading) {
    return <div className="loading-spinner-container" >
      <CircularProgress size={60} />
    </div>; 
  }
  if (currentUser === undefined) {
    return null
  }
  if (!currentUser) {
    return <Navigate to="/login" />
  }

  return children
};
export default ProtectedRoutes;
