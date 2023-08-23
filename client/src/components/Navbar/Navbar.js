// components/Home.js
import React from "react";

import "./Navbar.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from '../../assets/logo/logo.png'
import logoBASE from '../../assets/logo/logoBASE.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';




const Home = () => {
    const [cookies, setCookie, remove] = useCookies(['user']);
    const handleLogout = () => {
        remove("token");
        remove("email");
        remove("name");
        remove("rfid");
        remove("tutorial");
        remove("locker");
    };

    const primaryTextColor = '#42273b';
    const secondaryTextColor = '#F5F5F5';
    const primaryBackgroundColor = '#F5F5F5';
    const secondaryBackgroundColor = '#9ee493';

    return (
        <div>

            <nav className="logo navbar navbar-expand-lg">
                
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <div className="row justify-content-start">
                            <div className="col">
                                <img src={logoBASE} alt="Logo BASE" height="30" className="d-inline-block align-text-top mx-2" />
                            </div>
                            <div className="col">
    
                                <img src={logo} alt="Logo" height="30" className="d-inline-block align-text-top mx-2" />
                            </div>
                            <div className="col">
                                <div className="logo-name">タッツ ボロー</div>
                                <div className="logo-desc">Tattsu borō (Touch to Borrow)</div>
    
                            </div>
                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <AccountCircleIcon style={{ fontSize: 25, color: primaryTextColor, padding: 1 }} />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto text-end">
                            <li className="nav-item ">
                                <Link className="nav-link" to="/">Home

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">Login
                                    
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="report">Report

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={handleLogout} className="nav-link" to="login">Logout

                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
    

        </div>    
    );
};

export default Home;
