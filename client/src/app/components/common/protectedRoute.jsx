// import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

const ProtectedRoute = ({ children }) => {
    let navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login", {
                replace: true,
                state: location.pathname
            });
        }
    }, [isLoggedIn]);
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(propTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
