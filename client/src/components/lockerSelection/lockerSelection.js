
import React, { useState } from 'react';
import "./lockerSelection.css";
import { Link } from "react-router-dom";


const App = () => {
    return (
        <div className="memilih-loker">
            <section className="container mx-auto mt-5 px-4 ">
                <div className="nama-loker my-3 text-center">
                    <h2>BC 101's Locker</h2>
                </div>
            </section>
            <section className="loker container mx-auto mt-5 px-4 ">
                <div className="row">
                    <div className="loker-card card text-bg-success mb-3 col m-3 position-relative" >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">1</h5>

                        </div>
                    </div>
                    <div className="loker-card card text-bg-danger mb-3 col m-3 position-relative " >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">2</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="loker-card card text-bg-success mb-3 col m-3 position-relative" >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">3</h5>

                        </div>
                    </div>
                    <div className="loker-card card text-bg-danger mb-3 col m-3 position-relative " >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">4</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <span className="loker-card card text-bg-success mb-3 col m-3 position-relative" role='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">5</h5>

                        </div>
                    </span>
                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirmation</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <div className="loker-popup ">
                                        <h2 className='text-center'>BC 101's Locker</h2>
                                        <span className="loker-card card text-bg-success mb-3 col m-3 position-relative mx-auto">
                                            <div className="card-body">
                                                <h5 className="card-title position-absolute top-50 start-50 translate-middle">5</h5>

                                            </div>
                                        </span>
                                    </div>
                                    <div className="confirm-text">
                                        <p className='text-center'>Please confirm your locker number</p>

                                        Procedure :
                                        <ul>
                                            <li>Please <b>open the locker door within 15 second</b> to complete the process.</li>
                                            <li>You have a <b>limit time to use this locker of 24 hour.</b></li>
                                            <li>You have a <b>cooldown of 2 hour before borrowing the same locker again.</b></li>
                                        </ul>
                                    </div>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <Link to='../locker'>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Understood</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="loker-card card text-bg-danger mb-3 col m-3 position-relative " >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">6</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="loker-card card text-bg-success mb-3 col m-3 position-relative" >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">7</h5>

                        </div>
                    </div>
                    <div className="loker-card card text-bg-danger mb-3 col m-3 position-relative " >
                        <div className="card-body">
                            <h5 className="card-title position-absolute top-50 start-50 translate-middle">8</h5>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default App;
