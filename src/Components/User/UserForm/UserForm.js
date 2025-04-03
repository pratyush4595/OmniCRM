import React, { useContext, useEffect, useState } from "react"
import { LoaderAlertContext } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Foorter/Footer";
import axios from "axios";

const UserForm = () => {
    const [user, setUser] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const { setIsLoading, setAlert } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    // useParams() allows access to route parameters
    const { userId } = useParams();

    // Fetch edit user data from API
    useEffect(() => {
        if (userId) {
            document.title = "Update User Details | OmniCRM";
        } else {
            document.title = "Add New User | OmniCRM";
        }

        if (userId) {
            setIsLoading(true);

            axios.get(process.env.REACT_APP_APIURL + "user")
                .then((res) => {
                    setIsLoading(false);

                    const result = res.data.find((u) => u._id === userId);
                    if (result) {
                        setUser({ ...result, confirmPassword: result.password });
                        setIsChecked(result.isActive);
                    };
                })
                .catch((err) => {
                    console.log(err.message);
                    setIsLoading(false);
                    setAlert({ message: "Something went wrong. Please try again !", type: "error" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" })
                    }, 2500);
                });
        }
    }, []);

    function handleFormSubmit() {
        // Check form validation and then proceed to submit the form
        const errors = {};

        if (validationErrors.name) {
            errors.name = validationErrors.name;
        } else {
            if (user.name) {
                errors.name = "noError";
            } else {
                errors.name = "Name is required";
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

        setValidationErrors(errors);

        if (errors.name === "noError" && errors.username === "noError" && errors.email === "noError" && errors.password === "noError" && errors.confirmPassword === "noError") {
            setIsLoading(true);

            if (userId) {
                axios.put(process.env.REACT_APP_APIURL + "user", {
                    "_id": user._id,
                    "name": user.name.trim(),
                    "email": user.email.trim(),
                    "username": user.username.trim(),
                    "password": user.password,
                    "isActive": isChecked
                })
                    .then((res) => {
                        setIsLoading(false);
                        setAlert({ message: user.name + " updated !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                        setTimeout(() => {
                            navigate("/users");
                        }, 3000);
                    })
                    .catch((err) => {
                        console.log(err.message);
                        setIsLoading(false);
                        setAlert({ message: `${err.message} ! Please try again.`, type: "error" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                    });
            } else {
                axios.post(process.env.REACT_APP_APIURL + "user/signup", {
                    "_id": "63dddee86b954514a24b" + (1000 + Math.floor((Math.random() * 9000))),
                    "name": user.name.trim(),
                    "email": user.email.trim(),
                    "username": user.username.trim(),
                    "password": user.password,
                    "isActive": isChecked
                })
                    .then((resp) => {
                        setIsLoading(false);
                        setAlert({ message: user.name + " added !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                        setTimeout(() => {
                            navigate("/users");
                        }, 3000);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setAlert({ message: `${err.message} ! Please try again.`, type: "error" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                    });
            }
        }
    }

    return (
        <React.Fragment>
            <div className="container custom-margin">
                <h4 className="mb-3 fw-medium">{userId ? "Edit User Details" : "Add a New User"}</h4>
                <form className="row g-3">
                    <div className="col-12">
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
                    <div className="col-12">
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
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={user.email || ""} placeholder="example@gmail.com" onChange={(e) => {
                            const regExp = /\S+@\S+\.\S+/;
                            if (regExp.test(e.target.value.trim())) {
                                setValidationErrors({ ...validationErrors, email: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, email: "Please enter a valid email address" });
                            }

                            setUser({ ...user, email: e.target.value });
                        }} />
                        {validationErrors.email !== undefined && validationErrors.email !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.email}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={user.password || ""} placeholder="***************" onChange={(e) => {
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
                    <div className="col-12">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" value={user.confirmPassword || ""} disabled={user.password ? false : true} placeholder="***************" onChange={(e) => {
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
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input check-input" type="checkbox" id="gridCheck" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                            <label className="form-check-label" htmlFor="gridCheck">Active user ?</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="button" className="primary-btn float-end" onClick={handleFormSubmit}>{userId ? "Update User" : "Add User"}</button>
                    </div>
                </form>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default UserForm;