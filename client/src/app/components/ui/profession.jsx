import React from "react";
import PropTypes from "prop-types";
import {
    getProfessionsById,
    getProfessionsLoadingStatus
} from "../../store/professions";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionsById(id));
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    if (!professionsLoading) {
        return <p>{profession.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
