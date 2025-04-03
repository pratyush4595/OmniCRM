import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import { LoaderAlertContext } from "../../App";
import "./Navbar.css";
import logo from "../../Images/Logo/logo.png";

const Navbar = () => {
    const { setAlert } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    let isLoggedin, loggedUser;
    if (sessionStorage.getItem("loginStatus") && sessionStorage.getItem("loginStatus") === "true") {
        isLoggedin = true;
    } else {
        isLoggedin = false;
    }
    if (sessionStorage.getItem("name")) {
        loggedUser = sessionStorage.getItem("name");
    } else {
        loggedUser = "";
    }

    const activeNavLink = "nav-link active";
    const inactiveNavLink = "nav-link";

    function handleLoginClick() {
        navigate("/login");
    }

    function handleLogoutClick() {
        sessionStorage.removeItem("loginStatus");
        sessionStorage.removeItem("name");
        setAlert({ message: "Logout successful !", type: "success" });
        setTimeout(() => {
            setAlert({ message: "", type: "" });
        }, 2500);
        setTimeout(() => {
            navigate("/login");
        }, 3000);
    }

    return (
        <nav className="navbar nav-underline navbar-expand-lg secondary-bg">
            <div className="container-fluid">
                {/* <!-- Mobile Menu Button and Brand --> */}
                <div className="d-flex align-items-center">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar">
                        <div className="custom-toggler-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                    <Link to="/" className="navbar-brand ms-3 ms-lg-2"><img src={logo} style={{ width: "135px", height: "50px" }} /></Link>
                    {/* <Link to="/" className="navbar-brand ms-3 ms-lg-2 fw-bold fs-3 primary-text" style={{backgroundColor: "#333333"}}>CRM</Link> */}
                </div>
                {/* <!-- Profile Section for Mobile --> */}
                <div className="d-lg-none d-flex align-items-center">
                    <span className="profile-circle">{loggedUser ? loggedUser[0] : <i className="bi bi-person"></i>}</span>
                    {isLoggedin && (
                        <button className="primary-btn ms-2" onClick={isLoggedin ? handleLogoutClick : handleLoginClick}>{isLoggedin ? "Logout" : "Login"}</button>
                    )}
                </div>

                {/* <!-- Desktop Navbar --> */}
                <div className="collapse navbar-collapse">
                    {/* <!-- Desktop Navigation Items --> */}
                    {isLoggedin && (
                        <React.Fragment>
                            <ul className="navbar-nav ms-auto me-auto mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/users" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>Users</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/tickets" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>Tickets</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto me-auto mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/form" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>New Customer</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/user_form" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>New User</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/ticket_form" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}>New Ticket</NavLink>
                                </li>
                            </ul>
                        </React.Fragment>
                    )}

                    {/* <!-- Profile Section for Desktop --> */}
                    <div className={`d-none d-lg-flex align-items-center ms-${isLoggedin ? 4 : "auto"}`}>
                        <span className="profile-circle">{loggedUser ? loggedUser[0] : <i className="bi bi-person"></i>}</span>
                        {isLoggedin && (
                            <button className="primary-btn ms-2" onClick={isLoggedin ? handleLogoutClick : handleLoginClick}>{isLoggedin ? "Logout" : "Login"}</button>
                        )}
                    </div>
                </div>
            </div>

            {/* <!-- Offcanvas for Mobile Nav --> */}
            <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {isLoggedin ? (
                        <React.Fragment>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink} aria-current="Home">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/users" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink} aria-current="Users">Users</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/tickets" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink} aria-current="Tickets">Tickets</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav mt-3">
                                <li className="nav-item">
                                    <NavLink to="/form" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink} aria-current="Home">New Customer</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/user_form" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink} aria-current="Users">New User</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/ticket_form" className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink} aria-current="Tickets">New Ticket</NavLink>
                                </li>
                            </ul>
                        </React.Fragment>
                    ) : (
                        <div>
                            <p>Login to Access Menu</p>
                            <button type="button" className="primary-btn" onClick={handleLoginClick}>Login</button>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;