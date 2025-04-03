import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import TicketDashboard from "../TicketDashboard/TicketDashboard";
import TicketItem from "../TicketItem/TicketItem";
import Footer from "../../Foorter/Footer";
import axios from "axios";

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [dashboardKey, setDashboardKey] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [isFetched, setIsFetched] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const { setIsLoading } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    // Filter tickets based on search
    const filteredTickets = tickets.filter((t) => t.status.includes(dashboardKey)).filter((t) => t.desc.toLowerCase().includes(searchKey.toLowerCase()));

    // Fetch tickets form API
    useEffect(() => {
        document.title = "Ticket Management | OmniCRM";
        setIsLoading(true);

        axios.get(process.env.REACT_APP_APIURL + "ticket")
            .then((resp) => {
                setTickets(resp.data);
                setIsLoading(false);
                setIsInitialRender(false);
                setIsFetched(true);
            })
            .catch((err) => {
                setIsLoading(false);
                setIsInitialRender(false);
                setIsFetched(false);
            })
    }, []);

    function handleNewTicketClick() {
        navigate("/ticket_form");
    }

    function clearSearchKey() {
        setSearchKey("");
    }

    return (
        !isInitialRender && (
            <React.Fragment>
                <div className="container custom-margin">
                    {isFetched ? (
                        <React.Fragment>
                            {/* Page Title */}
                            <h1 className="mb-4 text-center">Ticket Management</h1>

                            {/* Dashboard Section */}
                            <h2 className="mb-3"><i className="bi bi-bar-chart"></i> Ticket Summary</h2>
                            <TicketDashboard tickets={tickets} setDashboardKey={setDashboardKey} setSearchKey={setSearchKey} />

                            {/* Search and Add Section */}
                            <h3 className="mb-3"><i className="bi bi-person-plus"></i> Manage Tickets</h3>
                            <div className="d-flex justify-content-between mb-4">
                                <div className="search-container w-50 me-3">
                                    {/* Search Input Box */}
                                    <input type="text" name="search" value={searchKey} placeholder="Search by Description..." onInput={(e) => {
                                        setSearchKey(e.target.value);
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
                                <button className="btn btn-success" onClick={handleNewTicketClick}><i className="bi bi-plus-lg"></i> Add New</button>
                            </div>

                            {/* Ticket Details Table */}
                            <h3 className="mb-3"><i className="bi bi-table"></i> All Tickets</h3>
                            {filteredTickets.length ? (
                                <div className="table-wrapper">
                                    <table className="table table-bordered text-center">
                                        <thead className="custom">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Descripton</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Assigned To</th>
                                                <th scope="col">Raised On</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTickets.map((ticket, index) => <TicketItem key={ticket._id} ticket={ticket} index={index} />)}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="alert alert-primary text-center" role="alert">
                                    No Ticket Found !
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

export default TicketList;