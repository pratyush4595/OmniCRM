import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import { Dropdown } from "primereact/dropdown";
import Footer from "../../Foorter/Footer";
import axios from "axios";
import "./CustomerForm.css";

const CustomerForm = () => {
    const [customer, setCustomer] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { setIsLoading, setAlert } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    // useParams() allows access to route parameters
    const { customerId } = useParams();

    // Create a customer status object
    const statuses = [
        { name: "New", desc: "New Customer" },
        { name: "Accepted", desc: "Accepted Customer" },
        { name: "Rejected", desc: "Rejected Customer" }
    ];

    // Get the edit customer data from API
    useEffect(() => {
        if (customerId) {
            document.title = "Update Customer Details | OmniCRM";
        } else {
            document.title = "Add New Customer | OmniCRM";
        }

        if (customerId) {
            setIsLoading(true);

            axios.get(process.env.REACT_APP_APIURL + "customer")
                .then((res) => {
                    setIsLoading(false);

                    const result = res.data.find((cus) => cus._id === customerId);
                    if (result) {
                        setCustomer(result);
                    }
                })
                .catch((err) => {
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
            if (customer.name) {
                errors.name = "noError";
            } else {
                errors.name = "Name is required";
            }
        }

        if (validationErrors.ceo) {
            errors.ceo = validationErrors.ceo;
        } else {
            if (customer.ceo) {
                errors.ceo = "noError";
            } else {
                errors.ceo = "CEO is required";
            }
        }

        if (validationErrors.website) {
            errors.website = validationErrors.website;
        } else {
            if (customer.website) {
                errors.website = "noError";
            } else {
                errors.website = "URL is required";
            }
        }

        if (validationErrors.employees) {
            errors.employees = validationErrors.employees;
        } else {
            if (customer.employees) {
                errors.employees = "noError";
            } else {
                errors.employees = "Employees is required";
            }
        }

        if (validationErrors.turnover) {
            errors.turnover = validationErrors.turnover;
        } else {
            if (customer.turnover) {
                errors.turnover = "noError";
            } else {
                errors.turnover = "Turnover is required";
            }
        }

        if (validationErrors.year) {
            errors.year = validationErrors.year;
        } else {
            if (customer.year) {
                errors.year = "noError";
            } else {
                errors.year = "Est. Year is required";
            }
        }

        if (validationErrors.isChecked) {
            errors.isChecked = validationErrors.isChecked;
        } else {
            errors.isChecked = "You must agree before submitting";
        }

        if (validationErrors.status) {
            errors.status = validationErrors.status
        } else {
            if (customer.status) {
                errors.status = "noError";
            } else {
                errors.status = "You must choose one";
            }
        }

        setValidationErrors(errors);

        if (errors.name === "noError" && errors.ceo === "noError" && errors.website === "noError" && errors.employees === "noError" && errors.turnover === "noError" && errors.year === "noError" && errors.isChecked === "noError" && errors.status === "noError") {
            setIsLoading(true);

            if (customerId) {
                axios.put(process.env.REACT_APP_APIURL + "customer", {
                    "_id": customer._id,
                    "name": customer.name,
                    "ceo": customer.ceo.trim(),
                    "website": customer.website.trim(),
                    "status": customer.status,
                    "employees": customer.employees,
                    "turnover": customer.turnover,
                    "year": customer.year
                })
                    .then((res) => {
                        setIsLoading(false);
                        setAlert({ message: customer.name + " updated !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                        setTimeout(() => {
                            navigate("/");
                        }, 3000);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setAlert({ message: `${err.message}. Please try again !`, type: "error" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                    });
            } else {
                axios.post(process.env.REACT_APP_APIURL + "customer", {
                    "_id": "63dddee86b954514a24b" + (1000 + Math.floor((Math.random() * 9000))),
                    "name": customer.name.trim().toUpperCase(),
                    "ceo": customer.ceo.trim(),
                    "website": customer.website.trim(),
                    "status": customer.status,
                    "employees": customer.employees,
                    "turnover": customer.turnover,
                    "year": customer.year
                })
                    .then((res) => {
                        setIsLoading(false);
                        setAlert({ message: customer.name + " added !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                        setTimeout(() => {
                            navigate("/");
                        }, 3000);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setAlert({ message: `${err.message}. Please try again !`, type: "error" });
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
                <h4 className="mb-3 fw-medium">{customerId ? "Edit Customer Details" : "Add a New Customer"}</h4>
                <form className="row g-3">
                    <div className="col-md-8">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={customer.name || ""} placeholder="e.g. Tech Innovations Inc." readOnly={customerId ? true : false} onChange={(e) => {
                            if (e.target.value.trim()) {
                                setValidationErrors({ ...validationErrors, name: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, name: "Please Enter a valid name" });
                            }

                            setCustomer({ ...customer, name: e.target.value });
                        }} />
                        {validationErrors.name !== undefined && validationErrors.name !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.name}</div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="ceo" className="form-label">CEO</label>
                        <input type="text" className="form-control" id="ceo" value={customer.ceo || ""} placeholder="e.g. John Doe" onChange={(e) => {
                            if (e.target.value.trim()) {
                                setValidationErrors({ ...validationErrors, ceo: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, ceo: "Please enter a valid ceo" });
                            }

                            setCustomer({ ...customer, ceo: e.target.value });
                        }} />
                        {validationErrors.ceo !== undefined && validationErrors.ceo !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.ceo}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="website" className="form-label">Website</label>
                        <input type="url" className="form-control" id="website" value={customer.website || ""} placeholder="e.g. https://companydomain.com" onChange={(e) => {
                            const regExp = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;
                            if (regExp.test(e.target.value.trim())) {
                                setValidationErrors({ ...validationErrors, website: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, website: "Please enter a valid URL" });
                            }

                            setCustomer({ ...customer, website: e.target.value });
                        }} />
                        {validationErrors.website !== undefined && validationErrors.website !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.website}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="status" className="form-label">Status</label>
                        <Dropdown value={customer.status ? statuses.find((s) => s.name === customer.status) : null} options={statuses} optionLabel="name" placeholder="Select a Status"
                            showClear checkmark={true} className="w-full" onChange={(e) => {
                                if (e.value) {
                                    setValidationErrors({ ...validationErrors, status: "noError" });
                                } else {
                                    setValidationErrors({ ...validationErrors, status: "You must choose one" });
                                }
                                setCustomer({ ...customer, status: e.value ? e.value.name : "" });
                            }} />
                        {/*<select id="status" className="form-select" value={customer.status || ""} onChange={(e) => {
                        if (e.target.value === "New" || e.target.value === "Accepted" || e.target.value === "Rejected") {
                            setValidationErrors({ ...validationErrors, status: "noError" });
                        } else {
                            setValidationErrors({ ...validationErrors, status: "You must choose one" });
                        }

                        setCustomer({ ...customer, status: e.target.value });
                    }}>
                        <option value="">Choose...</option>
                        <option value="New">New</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>*/}
                        {validationErrors.status !== undefined && validationErrors.status !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.status}</div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="employees" className="form-label">Number of Employees</label>
                        <input type="number" className="form-control" id="employees" value={customer.employees || ""} placeholder="e.g. 3000" onChange={(e) => {
                            if (e.target.value) {
                                setValidationErrors({ ...validationErrors, employees: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, employees: "Please enter valid employees" });
                            }

                            setCustomer({ ...customer, employees: e.target.value });
                        }} />
                        {validationErrors.employees !== undefined && validationErrors.employees !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.employees}</div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="turnover" className="form-label">Annual Turnover</label>
                        <input type="number" className="form-control" id="turnover" value={customer.turnover || ""} placeholder="e.g. 5000000" onChange={(e) => {
                            if (e.target.value) {
                                setValidationErrors({ ...validationErrors, turnover: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, turnover: "Please enter valid turnover" });
                            }

                            setCustomer({ ...customer, turnover: e.target.value });
                        }} />
                        {validationErrors.turnover !== undefined && validationErrors.turnover !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.turnover}</div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="year" className="form-label">Established Year</label>
                        <input type="number" className="form-control" id="year" value={customer.year || ""} placeholder="e.g. 1995" onChange={(e) => {
                            if (e.target.value) {
                                setValidationErrors({ ...validationErrors, year: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, year: "Please enter valid year" });
                            }

                            setCustomer({ ...customer, year: e.target.value });
                        }} />
                        {validationErrors.year !== undefined && validationErrors.year !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.year}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input check-input" type="checkbox" id="customerCheck" checked={isChecked} onChange={(e) => {
                                if (e.target.checked) {
                                    setValidationErrors({ ...validationErrors, isChecked: "noError" });
                                } else {
                                    setValidationErrors({ ...validationErrors, isChecked: "You must agree before submitting" });
                                }

                                setIsChecked(e.target.checked);
                            }} />
                            <label className="form-check-label" htmlFor="customerCheck">{`Confirm Details ! ${customerId ? "" : "You Can't Edit Customer Name Later"}`}</label>
                            {validationErrors.isChecked !== undefined && validationErrors.isChecked !== "noError" && (
                                <div className="invalid-feedback">{validationErrors.isChecked}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="button" className="primary-btn float-end" onClick={handleFormSubmit}>{customerId ? "Update Customer" : "Add Customer"}</button>
                    </div>
                </form>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default CustomerForm;