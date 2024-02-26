
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import QrReader from "react-qr-reader";
import "./scanQRPage.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import Grid from "@mui/material/Grid";


const App = () => {
    const primaryTextColor = '#42273b';
    const secondaryTextColor = '#F5F5F5';
    const clickableTextColor = '#415d43';
    const primaryBackgroundColor = '#F5F5F5';
    const secondaryBackgroundColor = '#9ee493';

    const navigate = useNavigate();
    const [selected, setSelected] = useState("environment");
    const [startScan, setStartScan] = useState(true);
    const [loadingScan, setLoadingScan] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [dataQR, setData] = useState("");

    const handleScan = async (scanData) => {
        setLoadingScan(true);
        console.log(`loaded`, scanData);
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
        const stringParts = dataString.split(new RegExp("selection/"));
        const idLockerName = stringParts[1];
        if (idLockerName.startsWith("BC") && idLockerName.length === 5) {
            setStartScan(false);
            setLoadingScan(false);
            return (
                navigate(`../selection/${idLockerName}`, { replace: true })
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
                            <QrReader className='mx-auto qr-reader'
                                facingMode={selected}
                                delay={1000}
                                onError={handleError}
                                onScan={handleScan}
                                // chooseDeviceId={()=>selected}
                                style={{ width: "100%" }}
                            />

                        </>
                    )}
                    {/* {dataQR !== "" && <p>{dataQR}</p>} */}
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