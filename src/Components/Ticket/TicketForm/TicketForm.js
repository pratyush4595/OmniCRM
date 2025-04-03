import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import { Dropdown } from "primereact/dropdown";
import Footer from "../../Foorter/Footer";
import axios from "axios";

const TicketForm = () => {
    const [ticket, setTicket] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const { setIsLoading, setAlert } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    // useParams() allows access to route parameters
    const { ticketId } = useParams();

    // Create a ticket status object
    const statuses = [
        { name: "New", desc: "New Ticket" },
        { name: "Assigned", desc: "Assigned Ticket" },
        { name: "In Progress", desc: "Ticket is in Progress" },
        { name: "Completed", desc: "Completed Ticket" }
    ]

    // Get all the customers and users form API to use them in dropdowns and also get the edit ticket details
    useEffect(() => {
        if (ticketId) {
            document.title = "Update Ticket Details | OmniCRM";
        } else {
            document.title = "Add New Ticket | OmniCRM";
        }
        setIsLoading(true);

        async function fetchData() {
            try {
                const cusResp = await axios.get(process.env.REACT_APP_APIURL + "customer");
                const userResp = await axios.get(process.env.REACT_APP_APIURL + "user");
                if (ticketId) {
                    const ticketResp = await axios.get(process.env.REACT_APP_APIURL + "ticket/" + ticketId);
                    if (ticketResp.data) {
                        setTicket({ ...ticketResp.data, raisedOn: ticketResp.data.raisedOn.split("/").reverse().join("-") });
                    }
                }

                setCustomers(cusResp.data);
                setUsers(userResp.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message);
                setIsLoading(false);
                setAlert({ message: "Something went wrong ! Please try again.", type: "error" });
                setTimeout(() => {
                    setAlert({ message: "", type: "" });
                }, 2500);
            }
        }

        fetchData();
    }, []);

    function handleFormSubmit() {
        // Check form validation and then proceed to submit the form
        const errors = {};

        if (validationErrors.customer) {
            errors.customer = validationErrors.customer;
        } else {
            if (ticket.customer) {
                errors.customer = "noError";
            } else {
                errors.customer = "You must choose one";
            }
        }

        if (validationErrors.desc) {
            errors.desc = validationErrors.desc;
        } else {
            if (ticket.desc) {
                errors.desc = "noError";
            } else {
                errors.desc = "Please enter a description";
            }
        }

        if (validationErrors.status) {
            errors.status = validationErrors.status;
        } else {
            if (ticket.status) {
                errors.status = "noError";
            } else {
                errors.status = "You must choose one";
            }
        }

        if (validationErrors.assignedTo) {
            errors.assignedTo = validationErrors.assignedTo;
        } else {
            if (ticket.assignedTo) {
                errors.assignedTo = "noError";
            } else {
                errors.assignedTo = "You must choose one";
            }
        }

        if (validationErrors.raisedOn) {
            errors.raisedOn = validationErrors.raisedOn;
        } else {
            if (ticket.raisedOn) {
                errors.raisedOn = "noError";
            } else {
                errors.raisedOn = "Please enter a date";
            }
        }

        if (validationErrors.isChecked) {
            errors.isChecked = validationErrors.isChecked;
        } else {
            errors.isChecked = "You must agree before submitting";
        }

        setValidationErrors(errors);
        if (errors.customer === "noError" && errors.desc === "noError" && errors.status === "noError" && errors.assignedTo === "noError" && errors.raisedOn === "noError" && errors.isChecked === "noError") {
            setIsLoading(true);

            if (ticketId) {
                axios.put(process.env.REACT_APP_APIURL + "ticket", {
                    "_id": ticket._id,
                    "customer": ticket.customer,
                    "desc": ticket.desc.trim(),
                    "status": ticket.status,
                    "assignedTo": ticket.assignedTo,
                    "raisedOn": ticket.raisedOn.split("-").reverse().join("/")
                })
                    .then((res) => {
                        setIsLoading(false);
                        setAlert({ message: "Ticket updated !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                        setTimeout(() => {
                            navigate("/tickets");
                        }, 3000);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setAlert({ message: "Something went wrong !", type: "error" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                    });
            } else {
                axios.post(process.env.REACT_APP_APIURL + "ticket", {
                    "_id": "52bc342ab" + (1000 + Math.floor(Math.random() * 9000)),
                    "customer": ticket.customer,
                    "desc": ticket.desc.trim(),
                    "status": ticket.status,
                    "assignedTo": ticket.assignedTo,
                    "raisedOn": ticket.raisedOn.split("-").reverse().join("/")
                })
                    .then((res) => {
                        setIsLoading(false);
                        setAlert({ message: "Ticket added !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                        }, 2500);
                        setTimeout(() => {
                            navigate("/tickets");
                        }, 3000);
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setAlert({ message: "Something went wrong !", type: "error" });
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
                <h4 className="mb-3 fw-medium">{ticketId ? "Edit Ticket Details" : "Add a New Ticket"}</h4>
                <form className="row g-3">
                    <div className="col-12">
                        <label htmlFor="customer" className="form-label">Customer</label>
                        <Dropdown value={ticket.customer ? customers.find((cus) => cus.name === ticket.customer) : null} options={customers} optionLabel="name" placeholder="Select a Customer"
                            filter showClear checkmark={true} disabled={ticketId ? true : false} className="w-full" onChange={(e) => {
                                if (e.value) {
                                    setValidationErrors({ ...validationErrors, customer: "noError" });
                                } else {
                                    setValidationErrors({ ...validationErrors, customer: "You must choose one" });
                                }
                                setTicket({ ...ticket, customer: e.value ? e.value.name : "" });
                            }} />
                        {/*<select id="customer" className="form-select" value={ticket.customer || ""} disabled={ticketId ? true : false} onChange={(e) => {
                        if (e.target.value != "Choose...") {
                            setValidationErrors({ ...validationErrors, customer: "noError" });
                        } else {
                            setValidationErrors({ ...validationErrors, customer: "You must choose one" });
                        }
                        setTicket({ ...ticket, customer: e.target.value });
                    }}>
                        <option value="Choose...">Choose...</option>
                        {customers.length && (
                            customers.map((cus) => <option key={cus._id} value={cus.name}>{cus.name}</option>)
                        )}
                    </select>*/}
                        {validationErrors.customer !== undefined && validationErrors.customer !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.customer}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" id="description" className="form-control" value={ticket.desc || ""} placeholder="e.g. Page is not loading" onChange={(e) => {
                            if (e.target.value.trim()) {
                                setValidationErrors({ ...validationErrors, desc: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, desc: "Please enter a valid description" });
                            }
                            setTicket({ ...ticket, desc: e.target.value });
                        }} />
                        {validationErrors.desc !== undefined && validationErrors.desc !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.desc}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="status" className="form-label">Status</label>
                        <Dropdown value={ticket.status ? statuses.find((s) => s.name === ticket.status) : null} options={statuses} optionLabel="name" placeholder="Select a Status"
                            showClear checkmark={true} className="w-full" onChange={(e) => {
                                if (e.value) {
                                    setValidationErrors({ ...validationErrors, status: "noError" });
                                } else {
                                    setValidationErrors({ ...validationErrors, status: "You must choose one" });
                                }
                                setTicket({ ...ticket, status: e.value ? e.value.name : "" });
                            }} />
                        {/*<select id="status" className="form-select" value={ticket.status || ""} onChange={(e) => {
                        if (e.target.value != "Choose...") {
                            setValidationErrors({ ...validationErrors, status: "noError" });
                        } else {
                            setValidationErrors({ ...validationErrors, status: "You must choose one" });
                        }
                        setTicket({ ...ticket, status: e.target.value });
                    }}>
                        <option value="Choose...">Choose...</option>
                        <option value="New">New</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>*/}
                        {validationErrors.status !== undefined && validationErrors.status !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.status}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="assigned_to" className="form-label">Assigned To</label>
                        <Dropdown value={ticket.assignedTo ? users.find((u) => u.name === ticket.assignedTo) : null} options={users} optionLabel="name" placeholder="Select an User"
                            filter showClear checkmark={true} className="w-full" onChange={(e) => {
                                if (e.value) {
                                    setValidationErrors({ ...validationErrors, assignedTo: "noError" });
                                } else {
                                    setValidationErrors({ ...validationErrors, assignedTo: "You must choose one" });
                                }
                                setTicket({ ...ticket, assignedTo: e.value ? e.value.name : "" });
                            }} />
                        {/*<select id="assigned_to" className="form-select" value={ticket.assignedTo || ""} onChange={(e) => {
                        if (e.target.value != "Choose...") {
                            setValidationErrors({ ...validationErrors, assignedTo: "noError" });
                        } else {
                            setValidationErrors({ ...validationErrors, assignedTo: "You must choose one" });
                        }
                        setTicket({ ...ticket, assignedTo: e.target.value });
                    }}>
                        <option value="Choose...">Choose...</option>
                        <option value="Not Assigned">Not Assigned</option>
                        {users.length && (
                            users.map((user) => <option key={user._id} value={user.name}>{user.name}</option>)
                        )}
                    </select>*/}
                        {validationErrors.assignedTo !== undefined && validationErrors.assignedTo !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.assignedTo}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <label htmlFor="raised_on" className="form-label">Raised On</label>
                        <input type="date" id="raised_on" className="form-control" value={ticket.raisedOn || ""} readOnly={ticketId ? true : false} onChange={(e) => {
                            const regExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/;
                            if (regExp.test(e.target.value.split("-").reverse().join("/"))) {
                                setValidationErrors({ ...validationErrors, raisedOn: "noError" });
                            } else {
                                setValidationErrors({ ...validationErrors, raisedOn: "Please enter a vaid date" });
                            }
                            setTicket({ ...ticket, raisedOn: e.target.value });
                        }} />
                        {validationErrors.raisedOn !== undefined && validationErrors.raisedOn !== "noError" && (
                            <div className="invalid-feedback">{validationErrors.raisedOn}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input type="checkbox" id="ticket_check" className="form-check-input check-input" checked={isChecked ? true : false} onChange={(e) => {
                                if (e.target.checked) {
                                    setValidationErrors({ ...validationErrors, isChecked: "noError" });
                                } else {
                                    setValidationErrors({ ...validationErrors, isChecked: "You must agree before submitting" });
                                }
                                setIsChecked(e.target.checked);
                            }} />
                            <label className="form-check-label" htmlFor="ticket_check">{`Confirm Details ! ${ticketId ? "" : "You Can't Edit Some Details Later"}`}</label>
                            {validationErrors.isChecked !== undefined && validationErrors.isChecked !== "noError" && (
                                <div className="invalid-feedback">{validationErrors.isChecked}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="button" className="primary-btn float-end" onClick={handleFormSubmit}>{ticketId ? "Update Ticket" : "Add Ticket"}</button>
                    </div>
                </form>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default TicketForm;