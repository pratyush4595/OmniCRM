import { useContext } from "react";
import { LoaderAlertContext } from "../../App";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./MainHeader.css";

const MainHeader = () => {
    const { isLoading, alert } = useContext(LoaderAlertContext);

    return (
        <>
            <div className="fixed-top">
                <Navbar />
                {/* Conditionally render the loader */}
                {isLoading && (
                    <div className="loader-container">
                        <div className="loader">
                            <div className="highlight"></div>
                        </div>
                    </div>
                )}
                {alert.message && (
                    <div className="alert-container">
                        <div className={`custom-alert alert alert-${alert.type === "success" ? "success" : "danger"} d-flex align-items-center shadow`} role="alert">
                            <i className={`bi bi-${alert.type === "success" ? "check" : "exclamation"}-circle-fill me-3`}></i>
                            <div>
                                <h6 className="alert-heading mb-1">{alert.type === "success" ? "Success" : "Error"}</h6>
                                <p className="mb-0">{alert.message}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
}

export default MainHeader;