const TicketDashboard = ({ tickets, setDashboardKey, setSearchKey }) => {
    const totalTickets = tickets.length;
    const newTickets = tickets.filter((t) => t.status === "New").length;
    const assignedTickets = tickets.filter((t) => t.status === "Assigned").length;
    const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length;
    const completedTickets = tickets.filter((t) => t.status === "Completed").length;

    return (
        <div className="row text-center">
            <div className="col mb-3">
                <div className="status-card bg-danger" onClick={() => {
                    setDashboardKey("");
                    setSearchKey("");
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-journal-text"></i>
                    </div>
                    <h3 className="text-white">{totalTickets}</h3>
                    <p className="text-white">Total<br />Tickets</p>
                </div>
            </div>
            <div className="col mb-3">
                <div className="status-card bg-primary" onClick={() => {
                    setDashboardKey("New");
                    setSearchKey("");
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-file-earmark-plus-fill"></i>
                    </div>
                    <h3 className="text-white">{newTickets}</h3>
                    <p className="text-white">New<br />Tickets</p>
                </div>
            </div>
            <div className="col mb-3">
                <div className="status-card bg-info" onClick={() => {
                    setDashboardKey("Assigned");
                    setSearchKey("");
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-person-check-fill"></i>
                    </div>
                    <h3 className="text-white">{assignedTickets}</h3>
                    <p className="text-white">Assigned<br />Tickets</p>
                </div>
            </div>
            <div className="col mb-3">
                <div className="status-card bg-warning" onClick={() => {
                    setDashboardKey("In Progress");
                    setSearchKey("");
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-hourglass-split"></i>
                    </div>
                    <h3 className="text-white">{inProgressTickets}</h3>
                    <p className="text-white">In Progress<br />Tickets</p>
                </div>
            </div>
            <div className="col mb-3">
                <div className="status-card bg-success" onClick={() => {
                    setDashboardKey("Completed");
                    setSearchKey("");
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h3 className="text-white">{completedTickets}</h3>
                    <p className="text-white">Completed<br />Tickets</p>
                </div>
            </div>
        </div>
    );
}

export default TicketDashboard;