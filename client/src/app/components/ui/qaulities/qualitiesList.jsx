import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesLoadingStatus,
    getQualitiesByIds,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (isLoading) return "Loadind ...";
    return (
        <>
            {qualitiesList.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
