
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import QrReader from "react-qr-reader";
import "./BorrowLocker.css";


// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import LockerSelection from '../lockerSelection/lockerSelection';
import Grid from "@mui/material/Grid";


const App = () => {
    const primaryTextColor = '#42273b';
    const secondaryTextColor = '#F5F5F5';
    const clickableTextColor = '#415d43';
    const primaryBackgroundColor = '#F5F5F5';
    const secondaryBackgroundColor = '#9ee493';


    const [selected, setSelected] = useState("environment");
    const [startScan, setStartScan] = useState(true);
    const [loadingScan, setLoadingScan] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [data, setData] = useState("");

    const handleScan = async (scanData) => {
        setLoadingScan(true);
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
            console.log(`loaded >>>`, scanData);
            setData(scanData);
            CheckScanned(scanData)
            // setPrecScan(scanData);
        }
    };
    const toggleCamera = () => {
        setIsButtonDisabled(true);

        if (selected === "environment") {
            setSelected("user");
        } else {
            setSelected("environment");
        }

        setIsButtonDisabled(false);
    };
    function CheckScanned(data) {

        const dataString = data;

            if (dataString.startsWith("BC") && dataString.length === 5) {
                setStartScan(false);
                setLoadingScan(false);

                return (
                    // <div>
                    //     <p>The data variable string starts with BC and has 5 characters.</p>
                    // </div>
                    alert("The data variable string starts with BC and has 5 characters.")
                );
            } else {
                return (
                    alert("The data variable string does not meet the condition.")
                );
            }

    }
    const handleError = (err) => {
        console.error(err);
    };
    return (
        <div className="App">
            <section className="container mt-5 px-4 ">
                <div className="kata-sambutan my-3 text-center">
                    <h2>Scan the locker's QR code!</h2>
                </div>
                <div className="info p-4 container">
                    {startScan && (
                        <>
                            <QrReader className='mx-auto'
                                facingMode={selected}
                                delay={1000}
                                onError={handleError}
                                onScan={handleScan}
                                // chooseDeviceId={()=>selected}
                                style={{ width: "250px" }}
                            />

                        </>
                    )}
                    {data !== "" && <p>{data}</p>}
                    {/* <div className="container-fluid mt-3 text-center">
                        <div className="row">
                            <div className="col">
                                <div className="tidak-ada-camera mx-auto position-relative" onClick={toggleCamera}>
                                    <div className="logo-tidak-ada-camera position-absolute top-50 start-50 translate-middle"  >
                                        <NoPhotographyIcon
                                            style={{ fontSize: 30, color: secondaryBackgroundColor, padding: 1 }}
                                        />
                                    </div>
                                </div>
                                <div>No Camera? Click Here</div>
                            </div>
                            <div className="col">
                                <div className="ganti-camera mx-auto position-relative" onClick={toggleCamera}>
                                    <div className="logo-ganti-camera position-absolute top-50 start-50 translate-middle" >
                                        <CameraswitchIcon
                                            style={{ fontSize: 30, color: secondaryBackgroundColor, padding: 1 }}
                                        />
                                    </div>
                                </div>
                                <div>Switch Camera</div>
                            </div>
                        </div>
                    </div> */}
                    <div className="container-fluid mt-4 text-center">
                        <div className="ganti-camera mx-auto position-relative" onClick={toggleCamera}>
                            <div className="logo-ganti-camera position-absolute top-50 start-50 translate-middle" >
                                <CameraswitchIcon
                                    style={{ fontSize: 30, color: secondaryBackgroundColor, padding: 1 }}
                                />
                            </div>
                        </div>
                        <div>Switch Camera</div>
                    </div>
                </div>
                <div className="container-fluid mt-2">
                    <Grid container>
                        <Grid item xs>

                        </Grid>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"No Camera? Click Here"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </section>

        </div>
    );
};

export default App;