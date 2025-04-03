import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import axios from "axios";
import "./CustomerItem.css";

const CustomerItem = ({ customer, index, currentPage, pageStrength, onCustomerDeleted }) => {
    const { setIsLoading, setAlert } = useContext(LoaderAlertContext);

    const navigate = useNavigate();

    // Handle customer edit
    function handleEditClick(id) {
        navigate("/form/" + id);
    }

    // Handle customer delete
    function handleDeleteClick(name) {
        setIsLoading(true);

        axios.delete(process.env.REACT_APP_APIURL + "customer/" + name)
            .then((res) => {
                setIsLoading(false);
                setAlert({ message: `${name} deleted !`, type: "success" });
                setTimeout(() => {
                    setAlert({ message: "", type: "" });
                }, 2500);
                setTimeout(() => {
                    onCustomerDeleted();
                }, 3000);
            })
            .catch((err) => {
                setIsLoading(false);
                setAlert({ message: "Something went wrong. Please try again !", type: "error" });
                setTimeout(() => {
                    setAlert({ message: "", type: "" });
                }, 2500);
            })
    }

    return (
        <tr>
            <th scope="row">{((currentPage - 1) * pageStrength) + (index + 1)}</th>
            <td>{customer.name}</td>
            <td>{customer.ceo}</td>
            <td><a href={customer.website} className="text-primary">{customer.website}</a></td>
            <td><span className={`badge badge-status bg-${customer.status === "New" ? "primary" : (customer.status === "Accepted" ? "success" : "danger")}`}>{customer.status}</span></td>
            <td>{customer.employees}</td>
            <td>{customer.turnover}</td>
            <td>{customer.year}</td>
            <td>
                <button type="button" className="btn btn-sm btn-warning ms-1 mb-1"><i className="bi bi-pencil" onClick={() => handleEditClick(customer._id)}></i></button>
                <button type="button" className="btn btn-sm btn-danger ms-1 mb-1"><i className="bi bi-trash" onClick={() => handleDeleteClick(customer.name)}></i></button>
            </td>
        </tr>
    );
}

export default CustomerItem;