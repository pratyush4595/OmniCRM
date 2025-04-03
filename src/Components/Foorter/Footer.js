import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../Images/Logo/logo.png";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="secondary-bg mt-4 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="d-flex justify-content-center">
                            <Link to="/" className="footer-heading"><img src={logo} style={{ width: "135px", height: "50px" }} /></Link>
                        </div>
                        <p className="footer-menu">
                            <Link to="/" className="footer-menu-item">HOME</Link>
                            <Link to="/form" className="footer-menu-item">NEW CUSTOMER</Link>
                            <Link to="/tickets" className="footer-menu-item">TICKETS</Link>
                            <Link to="/ticket_form" className="footer-menu-item">NEW TICKET</Link>
                        </p>
                        <ul className="footer-social">
                            <li><a href="https://www.linkedin.com/in/pratyushswain"><i className="bi bi-linkedin fs-5"></i></a></li>
                            <li><a href="https://github.com/pratyush4595"><i className="bi bi-github fs-5"></i></a></li>
                            <li><a href="https://x.com/PRATYUS97836131"><i className="bi bi-twitter-x fs-5"></i></a></li>
                        </ul>
                    </div>
                    <div className="col-12 text-center mt-2">
                        <p>Copyright &copy; {currentYear} All rights reserved | This Website is developed with&nbsp;
                            <i className="bi bi-heart-fill"></i> by&nbsp;
                            <span className="text-info fw-bold">Pratyush.</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;