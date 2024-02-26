import React, { useState, useEffect } from "react";
import "./lockerSelection.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../Services/axiosInterceptor";
import { CircularProgress } from '@mui/material';
import { useCookies } from "react-cookie";



function LockerComponent({ id, lockerNumber, lockerStatus }) {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);
    const [user, setUser] = useState({
        email: cookies.email,
        token: cookies.token,
        name: cookies.name,
        lockerId: cookies.lockerId,
        lockerNumber: cookies.lockerNumber,
        rfid: cookies.rfid,
        tutorial: cookies.tutorial,
    });
    const token = cookies.token;
    const email = cookies.email;

    const handleConfirmation = async (id, lockerNumber, token, email) => {
        const input = {
            id: id.id,
            number: lockerNumber.lockerNumber,
            token: token.token,
            email: email.email
        };
        console.log(input)
        try {
            const response = await axios.post("api/transaction/locker/borrow", input);
            if (response.status === 200) {
                return (
                    navigate(`../../`, { replace: true })
                );
            }
        } catch (error) {
            return (
                alert(error.response.data.message)
            );
        }

    };

    const lockerColor = lockerStatus === 1 ? "text-bg-danger" : "text-bg-success";
    const lockerClickable = lockerStatus !== 1;
    return (
        <>
            <span
                className={`loker-card card ${lockerColor} mb-3 col m-3 position-relative`}
                {...(lockerClickable && { role: "button", "data-bs-toggle": "modal", "data-bs-target": `#staticBackdrop${lockerNumber}` })}
            >
                <div className="card-body">
                    <h5 className="card-title position-absolute top-50 start-50 translate-middle">
                        {lockerNumber}
                    </h5>
                </div>
            </span>
            <div
                className={`modal fade`}
                id={`staticBackdrop${lockerNumber}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby={`staticBackdropLabel${lockerNumber}`}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`staticBackdropLabel${lockerNumber}`}>
                                Confirmation
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="loker-popup ">
                                <h2 className="text-center">{id}'s Locker</h2>
                                <span
                                    className={`loker-card card ${lockerColor} mb-3 col m-3 position-relative mx-auto`}
                                    aria-label={`Locker ${lockerNumber}`}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title position-absolute top-50 start-50 translate-middle">
                                            {lockerNumber}
                                        </h5>
                                    </div>
                                </span>
                            </div>
                            <div className="confirm-text">
                                <p className="text-center">
                                    Please confirm your locker number
                                </p>
                                <ul>
                                    <li>
                                        Please <b>open the locker door within 15 seconds</b> to
                                        complete the process.
                                    </li>
                                    <li>
                                        You have a <b>limit time to use this locker of 24 hours.</b>
                                    </li>
                                    <li>
                                        You have a <b>cooldown of 2 hours before borrowing the same
                                            locker again.</b>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"

                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => handleConfirmation({ id }, { lockerNumber }, { token }, { email })}
                            >
                                Understood
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const generateLockers = (apiData) => {

    const lockers = [];
    for (let i = 0; i < apiData.length; i++) {
        lockers.push({
            id: `locker-${i}`,
            lockerNumber: i + 1,
            lockerStatus: parseInt(apiData[i]),
        });
    }
    return lockers;
};
const LockerSection = (apiData, id) => {
    const lockers = generateLockers(apiData);
    // Create an array of arrays, where each sub-array has two lockers
    const lockerRows = [];
    for (let i = 0; i < lockers.length; i += 2) {
        lockerRows.push(lockers.slice(i, i + 2));
    }

    return (
        <section className="loker container mx-auto mt-5 px-4 ">
            {lockerRows.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((locker) => (
                        <LockerComponent key={locker.id} id={id} lockerNumber={locker.lockerNumber} lockerStatus={locker.lockerStatus} />
                    ))}
                </div>
            ))}
        </section>
    );
};


const App = () => {
    const [lockerStatus, setLockerStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const input = {
        lockerRoomLoc: id,
    };
    useEffect(() => {
        setTimeout(() => {
            if (input) {
                const fetchLockerStatus = async () => {
                    try {
                        const response = await axios.post("api/info/locker/status", input);
                        if (response.status === 200) {
                            setLockerStatus(response.data.status);
                        }
                    } catch (error) {
                        alert(error.response.data.message);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchLockerStatus();
            } else {
                alert("Locker Doesn't Exist");
                setLoading(false);
            }
        }, 1000);
    }, [input]);

    if (loading) {
        return (<div className="loading-spinner-container">
            <CircularProgress size={60} />
        </div>);
    }

    return (
        <div className="memilih-loker">
            <section className="container mx-auto mt-5 px-4 ">
                <div className="nama-loker my-3 text-center">
                    <h2 className="lockerID">{id}'s Locker</h2>
                </div>
            </section>

            {/* <div className="row">
                    <LockerComponent id={id} lockerNumber={1} lockerStatus={1} />
                    <LockerComponent id={id} lockerNumber={2} lockerStatus={0} />
                </div>
                <div className="row">
                    <LockerComponent id={id} lockerNumber={3} lockerStatus={1} />
                    <LockerComponent id={id} lockerNumber={4} lockerStatus={1} />
                </div>
                <div className="row">
                    <LockerComponent id={id} lockerNumber={5} lockerStatus={1} />
                    <LockerComponent id={id} lockerNumber={6} lockerStatus={1} />
                </div>
                <div className="row">
                    <LockerComponent id={id} lockerNumber={7} lockerStatus={1} />
                    <LockerComponent id={id} lockerNumber={8} lockerStatus={1} />
                </div> */}
            {LockerSection(lockerStatus, id)}

        </div>
    );
};

export default App;