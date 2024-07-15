import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.userRegister(email, password);
            if (response.email) {
                console.log("user registered was successfull.");
                alert("Message: User registered was successfull.");
                navigate("/");
            }
        } catch (error) {
            setError("Error to register.");
        }
    };

    return (
        <div className="container-fluid py-5">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="staticEmail"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Register</button>
                </div>
            </form>
            <Link to="/">Back Home</Link>
        </div>
    );
};