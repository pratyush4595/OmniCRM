import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SecureRoute = (props) => {
    const [isLoggedin, setIsloggedin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loginStatus = sessionStorage.getItem("loginStatus");
        if (!loginStatus || loginStatus != "true") {
            navigate("/login");
        } else {
            setIsloggedin(true);
        };
    }, []);

    return (
        <React.Fragment>
            {isLoggedin ? props.children : null}
        </React.Fragment>
    );
}

export default SecureRoute;