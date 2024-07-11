import React, { useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("accessToken");

        if (!isLoggedIn) {
            navigate("/");
        } else {
            actions.userPrivate()
                .then(() => console.log("Protected data has loaded successfully."))
                .catch(error => console.error("Error loading data.", error));
        }
    }, [actions, navigate]);

    const { user } = store;

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <h1>
                    {user ? (
                        <p>Welcome, {user.email}, thanks for logging in!</p>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </h1>
            </div>
        </>
    );
};