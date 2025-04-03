import "./CustomerDashboard.css";

const CustomerDashboard = ({ customers, setDashboardKey, setSearchKey, setCurrentPage }) => {
    const allCustomers = customers.length;
    const newCustomers = customers.filter((cus) => cus.status === "New").length;
    const acceptedCustomers = customers.filter((cus) => cus.status === "Accepted").length;
    const rejectedCustomers = customers.filter((cus) => cus.status === "Rejected").length;

    return (
        <div className="row text-center">
            <div className="col-md-3 mb-3">
                <div className="status-card bg-info" onClick={() => {
                    setDashboardKey("");
                    setSearchKey("");
                    setCurrentPage(1);
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-people-fill"></i>
                    </div>
                    <h3 className="text-white">{allCustomers}</h3>
                    <p className="text-white">Total<br />Customers</p>
                </div>
            </div>
            <div className="col-md-3 mb-3">
                <div className="status-card bg-primary" onClick={() => {
                    setDashboardKey("New");
                    setSearchKey("");
                    setCurrentPage(1);
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-person-plus-fill"></i>
                    </div>
                    <h3 className="text-white">{newCustomers}</h3>
                    <p className="text-white">New<br />Customers</p>
                </div>
            </div>
            <div className="col-md-3 mb-3">
                <div className="status-card bg-success" onClick={() => {
                    setDashboardKey("Accepted");
                    setSearchKey("");
                    setCurrentPage(1);
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h3 className="text-white">{acceptedCustomers}</h3>
                    <p className="text-white">Accepted<br />Customers</p>
                </div>
            </div>
            <div className="col-md-3 mb-3">
                <div className="status-card bg-danger" onClick={() => {
                    setDashboardKey("Rejected");
                    setSearchKey("");
                    setCurrentPage(1);
                }}>
                    <div className="icon text-white">
                        <i className="bi bi-x-circle-fill"></i>
                    </div>
                    <h3 className="text-white">{rejectedCustomers}</h3>
                    <p className="text-white">Rejected<br />Customers</p>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;