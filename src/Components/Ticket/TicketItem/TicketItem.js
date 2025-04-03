import { useNavigate } from "react-router-dom";

const TicketItem = ({ ticket, index }) => {
    const navigate = useNavigate();

    function handleEditClick(id) {
        navigate("/ticket_form/" + id);
    }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{ticket.customer}</td>
            <td>{ticket.desc}</td>
            <td><span className={`badge badge-status bg-${ticket.status === "New" ? "primary" : (ticket.status === "Assigned" ? "info" : (ticket.status === "In Progress" ? "warning" : "success"))}`}>{ticket.status}</span></td>
            <td>{ticket.assignedTo}</td>
            <td>{ticket.raisedOn}</td>
            <td>
                <button type="button" className="btn btn-sm btn-warning ms-1 mb-1" onClick={() => handleEditClick(ticket._id)}><i className="bi bi-pencil"></i> Edit</button>
            </td>
        </tr>
    );
}

export default TicketItem;