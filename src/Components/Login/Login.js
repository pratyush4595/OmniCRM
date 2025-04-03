import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderAlertContext } from "../../App";
import Footer from "../Foorter/Footer";
import axios from "axios";
import login_graphic from "../../Images/Login/login_graphic.jpg";
import "./Login.css";

const Login = () => {
    const [user, setUser] = useState({});
    const [showSignup, setShowSignup] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const { setIsLoading, setAlert } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    // Set document title
    useEffect(() => {
        document.title = "Login | OmniCRM";
    }, []);

    function handleShowSignup() {
        setShowSignup(!showSignup);
    }

    function handleLogin() {
        // Check form validation and then proceed to submit the form
        const errors = {};

        if (validationErrors.email) {
            errors.email = validationErrors.email;
        } else {
            if (user.email) {
                errors.email = "noError";
            } else {
                errors.email = "Email is required";
            }
        }

        if (validationErrors.password) {
            errors.password = validationErrors.password;
        } else {
            if (user.password) {
                errors.password = "noError";
            } else {
                errors.password = "Password is required";
            }
        }

        if (validationErrors.isChecked) {
            errors.isChecked = validationErrors.isChecked;
        } else {
            errors.isChecked = "You must agree before submitting";
        }

        setValidationErrors(errors);

        if (errors.email === "noError" && errors.password === "noError" && errors.isChecked === "noError") {
            setIsLoading(true);

            axios.post(process.env.REACT_APP_APIURL + "user/signin", {
                "email": user.email.trim(),
                "password": user.password.trim()
            })
                .then((res) => {
                    sessionStorage.setItem("loginStatus", "true");
                    sessionStorage.setItem("name", res.data.name);
                    setIsLoading(false);
                    setAlert({ message: "Log in successful !", type: "success" })
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500);
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setAlert({ message: err.response ? err.response.data : err.message, type: "error" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500);
                });
        }
    }

    function handleSignup() {
        // Check form validation and then proceed to submit the form
        const errors = {};

        if (validationErrors.name) {
            errors.name = validationErrors.name;
        } else {
            if (user.name) {
                errors.name = "noError";
            } else {
                errors.name = "Name is requierd";
            }
        }

        if (validationErrors.username) {
            errors.username = validationErrors.username;
        } else {
            if (user.username) {
                errors.username = "noError";
            } else {
                errors.username = "Username is required";
            }
        }

        if (validationErrors.email) {
            errors.email = validationErrors.email;
        } else {
            if (user.email) {
                errors.email = "noError";
            } else {
                errors.email = "Email is required";
            }
        }

        if (validationErrors.password) {
            errors.password = validationErrors.password;
        } else {
            if (user.password) {
                errors.password = "noError";
            } else {
                errors.password = "Password is required";
            }
        }

        if (validationErrors.confirmPassword) {
            errors.confirmPassword = validationErrors.confirmPassword;
        } else {
            if (user.confirmPassword) {
                errors.confirmPassword = "noError";
            } else {
                errors.confirmPassword = "Confirm password is required";
            }
        }

        if (validationErrors.isChecked) {
            errors.isChecked = validationErrors.isChecked;
        } else {
            errors.isChecked = "You must agree before submitting";
        }

        setValidationErrors(errors);

        if (errors.name === "noError" && errors.username === "noError" && errors.email === "noError" && errors.password === "noError" && errors.confirmPassword === "noError" && errors.isChecked === "noError") {
            alert("Alert !\nPublic sign up is not allowed. Only Admin users can add new users.");

            // User Sign up
            /*
            setIsLoading(true);

            axios.post(process.env.REACT_APP_APIURL + "user/signup", {
                "_id": "63dddee8338e1da7dde89" + 100 + Math.floor((Math.random() * 900)),
                "name": user.name.trim(),
                "username": user.username.trim(),
                "email": user.email.trim(),
                "password": user.password,
                "isActive": true
            })
                .then((res) => {
                    setIsLoading(false);
                    setShowSignup(!showSignup);
                    setUser({ email: user.email });
                    setValidationErrors({});
                    setIsChecked(false);
                    setAlert({ message: "Account created. Please log in to your account !", type: "success" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setValidationErrors({});
                    setAlert({ message: err.response ? err.response.data : err.message, type: "error" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500);
                });
            */
        }
    }

    return (
        <React.Fragment>
            {/*Login/Signup form*/}
            <div className="container custom-margin">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="px-lg-5 py-lg-5">
                            <div className="card border-light">
                                <div className="px-3">
                                    <h2 className="primary-text">Hello, welcome!</h2>
                                    <p>{showSignup ? "Create your new account" : "Login to your dashboard"}</p>
                                </div>
                                <div className="card-body">
                                    <form className="row g-3 needs-validation">
                                        {showSignup && (
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="name" value={user.name || ""} placeholder="John Doe" onChange={(e) => {
                                                    if (e.target.value.trim()) {
                                                        setValidationErrors({ ...validationErrors, name: "noError" });
                                                    } else {
                                                        setValidationErrors({ ...validationErrors, name: "Please enter a valid name" });
                                                    }

                                                    setUser({ ...user, name: e.target.value });
                                                }} />
                                                {validationErrors.name !== undefined && validationErrors.name !== "noError" && (
                                                    <div className="invalid-feedback">{validationErrors.name}</div>
                                                )}
                                            </div>
                                        )}
                                        {showSignup && (
                                            <div className="col-md-6">
                                                <label htmlFor="username" className="form-label">Username</label>
                                                <input type="text" className="form-control" id="username" value={user.username || ""} placeholder="john.doe" onChange={(e) => {
                                                    if (e.target.value.trim()) {
                                                        setValidationErrors({ ...validationErrors, username: "noError" });
                                                    } else {
                                                        setValidationErrors({ ...validationErrors, username: "Please enter a valid username" });
                                                    }

                                                    setUser({ ...user, username: e.target.value });
                                                }} />
                                                {validationErrors.username !== undefined && validationErrors.username !== "noError" && (
                                                    <div className="invalid-feedback">{validationErrors.username}</div>
                                                )}
                                            </div>
                                        )}
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" value={user.email || ""} placeholder="example@gmail.com" onChange={(e) => {
                                                const regExp = /\S+@\S+\.\S+/;
                                                if (regExp.test(e.target.value.trim())) {
                                                    setValidationErrors({ ...validationErrors, email: "noError" });
                                                } else {
                                                    setValidationErrors({ ...validationErrors, email: "Please enter a valid email" });
                                                }

                                                setUser({ ...user, email: e.target.value });
                                            }} />
                                            {validationErrors.email !== undefined && validationErrors.email !== "noError" && (
                                                <div className="invalid-feedback">{validationErrors.email}</div>
                                            )}
                                        </div>
                                        <div className={showSignup ? "col-md-6" : "col-12"}>
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" value={user.password || ""} placeholder="**************" onChange={(e) => {
                                                let temp = validationErrors;
                                                if (user.confirmPassword) {
                                                    if (e.target.value === user.confirmPassword) {
                                                        temp = { ...temp, confirmPassword: "noError" };
                                                    } else {
                                                        temp = { ...temp, confirmPassword: "Password should be matched" };
                                                    }
                                                }

                                                if (e.target.value) {
                                                    temp = { ...temp, password: "noError" };
                                                } else {
                                                    temp = { ...temp, password: "Please enter a password" };
                                                }

                                                setValidationErrors(temp);
                                                setUser({ ...user, password: e.target.value });
                                            }} />
                                            {validationErrors.password !== undefined && validationErrors.password !== "noError" && (
                                                <div className="invalid-feedback">{validationErrors.password}</div>
                                            )}
                                        </div>
                                        {showSignup && (
                                            <div className="col-md-6">
                                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" id="confirmPassword" value={user.confirmPassword || ""} disabled={user.password ? false : true} placeholder="**************" onChange={(e) => {
                                                    if (e.target.value === user.password) {
                                                        setValidationErrors({ ...validationErrors, confirmPassword: "noError" });
                                                    } else {
                                                        setValidationErrors({ ...validationErrors, confirmPassword: "Password should be matched" });
                                                    }

                                                    setUser({ ...user, confirmPassword: e.target.value });
                                                }} />
                                                {validationErrors.confirmPassword !== undefined && validationErrors.confirmPassword !== "noError" && (
                                                    <div className="invalid-feedback">{validationErrors.confirmPassword}</div>
                                                )}
                                            </div>
                                        )}
                                        <div className="mb-3 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input check-input" id="userCheck" checked={isChecked} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setValidationErrors({ ...validationErrors, isChecked: "noError" });
                                                    } else {
                                                        setValidationErrors({ ...validationErrors, isChecked: "You must agree before submitting" });
                                                    }

                                                    setIsChecked(e.target.checked);
                                                }} />
                                                <label className="form-check-label" htmlFor="userCheck">{showSignup ? "Agree to T&Cs" : "Confirm details"}</label>
                                                {validationErrors.isChecked !== undefined && validationErrors.isChecked !== "noError" && (
                                                    <div className="invalid-feedback">{validationErrors.isChecked}</div>
                                                )}
                                            </div>
                                            {showSignup ? (
                                                <button type="button" className="btn btn-link primary-text text-decoration-none" style={{ paddingTop: "5px", paddingBottom: "7px" }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Terms & Conditions</button>
                                            ) : (
                                                <button type="button" className="btn btn-link primary-text text-decoration-none" style={{ paddingTop: "5px", paddingBottom: "7px" }}>Forgot Password?</button>
                                            )}
                                        </div>
                                        <div className="d-grid">
                                            <button type="button" className="primary-btn" onClick={showSignup ? handleSignup : handleLogin}>{showSignup ? "Sign up" : "Log in"}</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="mt-2 px-3">
                                    <div>
                                        {showSignup ? "Already have an account?" : "Don't have an account yet?"}
                                        <button type="button" className="btn btn-link primary-text text-decoration-none" style={{ paddingTop: "4px", paddingBottom: "8px" }} onClick={handleShowSignup}>{showSignup ? "Log in" : "Sign up"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="h-100 py-5">
                            <img width="100%" height="100%" src={login_graphic} alt="login_graphic" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Signup T&C Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 montserrat" id="staticBackdropLabel">Terms and Conditions</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h6 className="montserrat">1. Acceptance of Terms</h6>
                                <p className="montserrat">By creating an account, you agree to adhere to all terms and conditions laid out here, including any future amendments or updates.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">2. User Account Responsibilities</h6>
                                <p className="montserrat">You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">3. Use of the CRM Platform</h6>
                                <p className="montserrat">The CRM platform should only be used for legitimate business purposes. Misuse, including unauthorized access, data scraping, or spamming, is prohibited.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">4. Privacy and Data Protection</h6>
                                <p className="montserrat">By signing up, you consent to the collection, storage, and use of your data per our Privacy Policy. Your data will only be used to improve your experience and comply with legal requirements.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">5. Service Availability</h6>
                                <p className="montserrat">The platform’s availability is subject to technical conditions and maintenance. We do not guarantee uninterrupted service but strive to minimize disruptions.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">6. Termination of Account</h6>
                                <p className="montserrat">We reserve the right to terminate or suspend accounts at our discretion if users are found violating these terms or engaging in harmful activities.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">7. Modification of Terms</h6>
                                <p className="montserrat">We may update these terms at any time. Continued use of the platform after changes have been posted constitutes acceptance of the new terms.</p>
                            </div>
                            <div>
                                <h6 className="montserrat">8. Governing Law</h6>
                                <p className="montserrat">These terms are governed by the laws of [your country/region], and you agree to submit to its jurisdiction for any disputes that may arise.</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="primary-btn" data-bs-dismiss="modal">I, understood</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Login;