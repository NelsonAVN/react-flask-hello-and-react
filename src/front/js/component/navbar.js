import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleLogout = () => {
        try {
            actions.userLogout();
            alert("User logged out.");
            navigate("/");
        } catch (error) {
            setError("Error to log out.");
        }
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Private view</span>
                </Link>
                <div className="ml-auto">
                    <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
        </nav>
    );
};