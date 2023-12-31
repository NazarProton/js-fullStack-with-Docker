import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";
import {
    getProfessionsLoadingStatus,
    getProfessionsById,
    loadProfessionsList
} from "../../store/professions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionsById(user.profession));
    const navigate = useNavigate();
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const handleClick = () => {
        navigate(`${userId}/edit`);
    };
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);
    if (isLoading) return "Loadind ...";
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUserId === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">{profession.name}</p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            ></i>
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
