import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderAlertContext } from "../../../App";
import UserItem from "../UserItem/UserItem";
import Footer from "../../Foorter/Footer";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const { setIsLoading } = useContext(LoaderAlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "User Management | OmniCRM";
        setIsLoading(true);

        axios.get(process.env.REACT_APP_APIURL + "user")
            .then((res) => {
                setUsers(res.data);
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

    function handleNewUserClick() {
        navigate("/user_form");
    }

    function handleOnUserActivatedDeactivated() {
        setUpdateTrigger(!updateTrigger);
    }

    return (
        !isInitialRender && (
            <React.Fragment>
                <div className="container custom-margin">
                    {isFetched ? (
                        <React.Fragment>
                            {/* Page Title */}
                            <h1 className="mb-4 text-center">User Management</h1>

                            {/* Heading and Add Section*/}
                            <div className="d-flex justify-content-between mb-3">
                                <h3><i className="bi bi-table"></i> All Users</h3>
                                <button className="btn btn-success" onClick={handleNewUserClick}><i className="bi bi-plus-lg"></i> Add New</button>
                            </div>

                            {users.length ? (
                                <div className="table-wrapper">
                                    <table className="table table-bordered text-center">
                                        <thead className="custom">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">State</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => <UserItem key={user._id} user={user} index={index} onUserActivatedDeactivated={handleOnUserActivatedDeactivated} />)}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="alert alert-primary text-center" role="alert">
                                    No User Data Found
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

export default UserList;