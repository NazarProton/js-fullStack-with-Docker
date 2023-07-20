import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../store/users";
// import useMockData from "../utils/mockData";

const Main = () => {
    const currentUser = useSelector(getCurrentUserData());
    // const {error, initialize, progress, status } = useMockData();
    // const handleClick = () => {
    //     initialize();
    // };
    return (
        <div className="container mt-5">
            <div className="ms-3">
                <h1>Fast-Company Main Page</h1>
                {/* <h3>Инициализация данных в FireBase</h3> */}
                <h3>Добро пожаловать {currentUser?currentUser.name:""}</h3>
                <h3>У нас ви можете легко вибрать с кем провести вечер!</h3>
                {/* <ul>
                <li>Status:{status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>error: {error}</li>}
            </ul> */}
                {/* <button className="btn btn-primary" onClick={handleClick}>
                {" "}
                Инициализировать
            </button> */}
            </div>
            <Link className="nav-link" aria-current="page" to="users">
                <h3>Выбрать!</h3>
            </Link>
        </div>
    );
};

export default Main;
