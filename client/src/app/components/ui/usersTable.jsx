import React from "react";
import PropTypes from "prop-types";
import Table, { TableBody, TableHeader } from "../common/table";
import BookMark from "../common/bookmark";
import Qualities from "./qaulities";
import { Link } from "react-router-dom";
import Profession from "./profession";
const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onHandleAdd,
    onHandleRemove
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился(раз)"
        },
        rate: { path: "sex", name: "Пол" },
        male: { path: "rate", name: "Оценка" },
        bookmark: {
            name: "Избранное",
            component: (user) => (
                <BookMark
                    user={user}
                    onHandleAdd={onHandleAdd}
                    onHandleRemove={onHandleRemove}
                />
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UsersTable.propTypes = {
    bookmarks: PropTypes.array,
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onHandleAdd: PropTypes.func,
    onHandleRemove: PropTypes.func
};

export default UsersTable;
