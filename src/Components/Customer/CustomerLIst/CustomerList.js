import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import CustomerDashboard from "../CustomerDashboard/CustomerDashboard";
import CustomerItem from "../CustomerItem/CustomerItem";
import Pagination from "../../Pagination/Pagination";
import Footer from "../../Foorter/Footer";
import axios from "axios";
import "./CustomerList.css";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [dashboardKey, setDashboardKey] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageStrength, setPageStrength] = useState(30);
    const { setIsLoading } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    const filteredCustomers = customers.filter((cus) => cus.status.includes(dashboardKey)).filter((cus) => cus.name.toLowerCase().includes(searchKey.toLowerCase()));
    const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageStrength, (currentPage * pageStrength));
    const paginationStates = {
        totalPage: Math.ceil(filteredCustomers.length / Number(pageStrength)),
        currentPage,
        pageStrength,
        siblings: 2,
        setCurrentPage,
        setPageStrength
    }

    // Fetch Customers data form API
    useEffect(() => {
        document.title = "Home - Customer Management | OmniCRM";
        setIsLoading(true);
        axios.get(process.env.REACT_APP_APIURL + "customer")
            .then((resp) => {
                setCustomers(resp.data);
                setIsLoading(false);
                setIsInitialRender(false);
                setIsFetched(true);
            })
            .catch((err) => {
                setIsLoading(false);
                setIsInitialRender(false);
                setIsFetched(false);
            });
    }, [updateTrigger]);

    // Navigate to customer form
    function handleNewCustomerClick() {
        navigate("/form");
    }

    // Refresh customers after a customer deleted
    function handleOnCustomerDeleted() {
        setUpdateTrigger(!updateTrigger);
    }

    // Clear the search key upon clear-icon clicked
    function clearSearchKey() {
        setSearchKey("");
        setCurrentPage(1);
    }

    return (
        !isInitialRender && (
            <React.Fragment>
                <div className="container custom-margin">
                    {isFetched ? (
                        <React.Fragment>
                            {/* Page Title */}
                            <h1 className="mb-4 text-center">Customer Management</h1>

                            {/* Dashboard Section */}
                            <h2 className="mb-3"><i className="bi bi-bar-chart"></i> Customer Summary</h2>
                            <CustomerDashboard customers={customers} setDashboardKey={setDashboardKey} setSearchKey={setSearchKey} setCurrentPage={setCurrentPage} />

                            {/* Search and Add Section */}
                            <h3 className="mb-3"><i className="bi bi-person-plus"></i> Manage Customers</h3>
                            <div className="d-flex justify-content-between mb-4">
                                <div className="search-container w-50 me-3">
                                    {/* Search Input Box */}
                                    <input type="text" name="search" value={searchKey} placeholder="Search by Name..." onInput={(e) => {
                                        setSearchKey(e.target.value);
                                        setCurrentPage(1);
                                    }} />
                                    {/* Clear Icon (SVG) */}
                                    <svg className="clear" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={clearSearchKey}>
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                    {/* Search Icon (SVG) */}
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </div>
                                <button className="btn btn-success" onClick={handleNewCustomerClick}><i className="bi bi-plus-lg"></i> Add New</button>
                            </div>

                            {/* Customer Details Table */}
                            <h3 className="mb-3"><i className="bi bi-table"></i> All Customers</h3>
                            {paginatedCustomers.length ? (
                                <React.Fragment>
                                    <div className="table-wrapper">
                                        <table className="table table-bordered text-center">
                                            <thead className="custom">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">CEO</th>
                                                    <th scope="col">Website</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Employees</th>
                                                    <th scope="col">Turnover</th>
                                                    <th scope="col">Estd. Year</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedCustomers.map((customer, index) => <CustomerItem key={customer._id} customer={customer} index={index} currentPage={currentPage} pageStrength={pageStrength} onCustomerDeleted={handleOnCustomerDeleted} />)}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Pagination Component */}
                                    <Pagination paginationStates={paginationStates} />
                                </React.Fragment>
                            ) : (
                                <div className="alert alert-primary text-center" role="alert">
                                    No Customer Data Found !
                                </div>
                            )}
                        </React.Fragment>
                    ) : (
                        <div className="alert alert-danger text-center" role="alert">
                            Something went wrong from server side. Please refresh !
                        </div>
                    )}
                </div>
                <Footer />
            </React.Fragment>
        )
    );
}

export default CustomerList;