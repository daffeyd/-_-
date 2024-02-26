
import React, { useState, useEffect } from 'react';
import axios from "../../Services/axiosInterceptor";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import "./lockerDetail.css";
import { useCookies } from "react-cookie";

const App = (props) => {
    const [cookies, setCookie] = useCookies(["user"]);
    const [decodedResults, setDecodedResults] = useState([]);
    const onNewScanResult = (decodedText, decodedResult) => {
        console.log("App [result]", decodedResult);
        setDecodedResults(prev => [...prev, decodedResult]);
    };
    const [user, setUser] = useState({
        email: cookies.email,
        token: cookies.token,
        name: cookies.name,
        lockerId: cookies.lockerId,
        lockerNumber: cookies.lockerNumber,
        rfid: cookies.rfid,
        tutorial: cookies.tutorial,
    });
    useEffect(() => {
        setTimeout(() => {
            if (user.email && user.token) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.post("api/info/locker/timelimit", user);
                        if (response.status === 200) {
                            const userCookie = [
                                {
                                    name: "Expired Date",
                                    value: response.data.lockerExpiredDate,
                                    options: {
                                        maxAge: cookies.lockerExpiredDate.maxAge,
                                        path: "/",
                                    },
                                }
                            ];
                            userCookie.forEach((cookie) => {
                                setCookie(cookie.name, cookie.value, cookie.options);
                            });
                            setUser({
                                ...user,
                                lockerId: response.data.lockerId,
                                lockerNumber: response.data.lockerNumber,
                                rfid: response.data.rfid,
                                tutorial: response.data.tutorial,
                            });
                        }
                    } catch (error) {
                        alert(error.response.data.message);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchUserData();
            } else {
                alert("cookie unavailable");
                setLoading(false);
            }
        }, 1000);
    }, []);
    return (
        <div>
            <section className="Detail Locker">
                <h3 className='text-center m-4'>Locker's Detail</h3>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Limit Time
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <strong>24 Hour Usage Limit Count Down :</strong>
                                <h2 className='m-3 text-center'>18 Hours 25 Minutes</h2>
                                <strong>2 Hour Cooldown for re-Borrowing</strong>
                                <h2 className='m-3 text-center'>2 Hours 00 Minutes</h2>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Locker Control
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <div className="info py-2">
                                    <div className="row-info row align-items-center justify-content-around d-inline-flex mx-auto">
                                        <div className="control col-6 align-self-start p-2 text-center text-white">
                                            <div className="text-white">Status</div>
                                            <LockOutlinedIcon
                                                style={{ fontSize: 30, color: "white", padding: 1 }}
                                            />
                                            <div>locked</div>
                                            <div className="row mt-2 d-flex justify-content-evenly">
                                                <div className="col-6">
                                                    <div className="button-lock mx-auto p-1">
                                                        <LockOutlinedIcon
                                                            style={{ fontSize: 30, color: "#42273b", padding: 1 }}
                                                        />
                                                    </div>
                                                    <div>Lock</div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="button-unlock mx-auto p-1">
                                                        <LockOpenOutlinedIcon
                                                            style={{ fontSize: 30, color: "#42273b", padding: 1 }}
                                                        />
                                                    </div>
                                                    <div>Unlock</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Open with RFID Feature
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
                            <div className="accordion-body text-center">
                                <strong>Available</strong>
                                <div className="d-grid gap-2 col-6 mx-auto">

                                    <button type="button" className="btn btn-outline-info m-3">Change RFID</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                Locker Information
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show">
                            <div className="accordion-body text-center">
                                <strong>BC 101</strong>

                                <span className="loker-card card text-bg-success mb-3 col m-3 position-relative mx-auto">
                                    <div className="card-body">
                                        <h5 className="card-title position-absolute top-50 start-50 translate-middle">5</h5>

                                    </div>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
