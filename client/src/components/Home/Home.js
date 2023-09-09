// components/Home.js
import React, { useState, useEffect } from "react";
import "./Home.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "../../Services/axiosInterceptor";
import { CircularProgress } from '@mui/material';




const primaryTextColor = '#42273b';
const secondaryTextColor = '#F5F5F5';
const clickableTextColor = '#415d43';
const primaryBackgroundColor = '#F5F5F5';
const secondaryBackgroundColor = '#9ee493';

const Home = () => {

  const [cookies, setCookie] = useCookies(['user']);
  const [loading, setLoading] = useState(true); // Add loading state


  const input = {
    email: cookies.email,
    token: cookies.token,
  };
  const [user, setUser] = useState({
    email: cookies.email,
    token: cookies.token,
    name: cookies.name,
    locker: cookies.locker,
    rfid: cookies.rfid,
    tutorial: cookies.tutorial
  });
  useEffect(() => {
    setTimeout(() => {

      if (input) {
        const fetchUserData = async () => {
          try {
            // Send a request to a secured route on your server
            const response = await axios.post('api/info/user/home', input);
            if (response.status === 200) {
              const userCookie = [
                { name: 'locker', value: response.data.locker, options: { maxAge: cookies.locker.maxAge, path: '/' } },
                { name: 'rfid', value: response.data.rfid, options: { maxAge: cookies.rfid.maxAge, path: '/' } },
                { name: 'tutorial', value: response.data.tutorial, options: { maxAge: cookies.tutorial.maxAge, path: '/' } }
              ];
              userCookie.forEach(cookie => {
                setCookie(cookie.name, cookie.value, cookie.options);
              });
              setUser({
                ...user,
                locker: response.data.locker,
                rfid: response.data.rfid,
                tutorial: response.data.tutorial
              });
            }
          } catch (error) {
            alert(error.response.data.message);
          } finally {
            setLoading(false); // Set loading state to false regardless of success or error
          }
        };
        fetchUserData();
      } else {
        alert("cookie unavailable");
        setLoading(false);
      }
    },)
  }, []);

  if (loading) {
    return <div className="loading-spinner-container" >
      <CircularProgress size={60} />
    </div>;
  }

  return (
    <div className="Home">
      <section className="container mt-5 px-4 ">
        <div className="kata-sambutan my-3">
          <h2>Hello, {user.name}!</h2>
        </div>
        <div className="info py-2 container-fluid">
          <div className="row-info row align-items-center mx-auto">
            <div className="loker-RFID col">
              <Link to={user.locker ? "locker" : "borrow"} style={{ textDecoration: 'none', color: primaryTextColor }} >
                <div className="loker-dipinjam">
                  <div className="p-2">
                    Current Locker:
                    <div className="nama-loker">
                      {user.locker ? user.locker : "None Borrowed"}
                    </div>
                    <div className="href-loker">
                      {user.locker ? "click for details" : "Click to borrow"}
                    </div>
                  </div>
                </div>
              </Link>

              <div className="rfid mt-2">
                <div className="p-2">
                  RFID :<div>Registered</div>
                </div>
              </div>
            </div>
            <div className="control col p-2 text-center" style={{ color: primaryTextColor }}>
              {LockerControlSection()}
            </div>
          </div>
        </div>
      </section>
      <section className="other-option mx-auto mt-5 px-4 text-black">
        <div className="container text-center">
          <div className="row ">

            <div className="col">
              <Link to="borrow" style={{ textDecoration: 'none', color: primaryTextColor }} >
                <div className="meminjam-loker mx-auto position-relative">
                  <div className="logo-meminjam position-absolute top-50 start-50 translate-middle">
                    <ManageSearchOutlinedIcon
                      style={{ fontSize: 30, color: secondaryTextColor, padding: 1 }}
                    />
                  </div>
                </div>
                <div>Borrow Locker</div>
              </Link>
            </div>
            <div className="col">
              <Link to="history" style={{ textDecoration: 'none', color: primaryTextColor }} >
                <div className="riwayat mx-auto position-relative">
                  <div className="logo-riwayat position-absolute top-50 start-50 translate-middle">
                    <UpdateOutlinedIcon
                      style={{ fontSize: 30, color: secondaryTextColor, padding: 1 }}
                    />
                  </div>
                </div>
                <div>History</div>
              </Link>
            </div>
            <div className="col">
              <Link to="help" style={{ textDecoration: 'none', color: primaryTextColor }} >
                <div className="bantuan mx-auto position-relative">
                  <div className="logo-bantuan position-absolute top-50 start-50 translate-middle">
                    <QuizOutlinedIcon
                      style={{ fontSize: 30, color: secondaryTextColor, padding: 1 }}
                    />
                  </div>
                </div>
                <div>Help</div>
              </Link>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};


export default Home;

function LockerControlSection() {
  return <div><div>Status</div>
    <LockOutlinedIcon
      style={{ fontSize: 30, color: primaryTextColor, padding: 1 }}
    />
    <div>Locked</div>
    <div className="row mt-2 d-flex justify-content-evenly">
      <div className="col-6">
        <div className="button-lock mx-auto p-1">
          <LockOutlinedIcon
            style={{ fontSize: 30, color: clickableTextColor, padding: 1 }}
          />
        </div>
        <div>Lock</div>
      </div>
      <div className="col-6">

        <div className="button-unlock mx-auto p-1" id="main">
          <LockOpenOutlinedIcon
            style={{ fontSize: 30, color: clickableTextColor, padding: 1 }}
          />
        </div>
        <div>Unlock</div>
      </div>
    </div>
  </div>
}