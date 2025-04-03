import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import axios from "axios";
import "./UserItem.css";

const UserItem = ({ user, index, onUserActivatedDeactivated }) => {
    const { setIsLoading, setAlert } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    function handleEditClick(id) {
        if (id === "63dddef8338e1da7dde89abc") {
            alert("Pratyush Swain can't be edited !");
            return;
        };

        navigate("/user_form/" + id);
    }

    function handleActivateDeactivateUser(username, isActive) {
        if (username === "pratyush.swain") {
            alert("Pratyush Swain can't be deactivated !");
            return;
        }

        setIsLoading(true);
        if (isActive) {
            axios.put(process.env.REACT_APP_APIURL + "user/deActivate/" + username)
                .then((resp) => {
                    setIsLoading(false);
                    setAlert({ message: user.name + ", deactivated !", type: "success" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500);
                    setTimeout(() => {
                        onUserActivatedDeactivated();
                    }, 3000);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setAlert({ message: `${err.message}. Please try again !`, type: "error" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500)
                })
        } else {
            axios.put(process.env.REACT_APP_APIURL + "user/activate/" + username)
                .then((resp) => {
                    setIsLoading(false);
                    setAlert({ message: user.name + ", activated !", type: "success" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    }, 2500);
                    setTimeout(() => {
                        onUserActivatedDeactivated();
                    }, 3000);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setAlert({ message: `${err.message}. Please try again !`, type: "error" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                    })
                })
        }
    }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td><span className={`badge badge-status bg-${user.isActive ? "info" : "danger"}`}>{user.isActive ? "Active" : "Inactive"}</span></td>
            <td>{user.email}</td>
            <td>
                <button type="button" className="btn btn-sm btn-warning mb-1" onClick={() => handleEditClick(user._id)}>Edit</button>
                <button type="button" className={`btn btn-sm btn-${user.isActive ? "danger" : "info"} ms-1 mb-1`} onClick={() => handleActivateDeactivateUser(user.username, user.isActive)}>{user.isActive ? "De-activate" : "Activate"}</button>
            </td>
        </tr>
    );
}

export default UserItem;