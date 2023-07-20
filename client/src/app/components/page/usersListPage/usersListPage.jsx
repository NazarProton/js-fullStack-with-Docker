import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import {
    getCurrentUserData,
    getCurrentUserId,
    getUsersList,
    updateUser
} from "../../../store/users";

const UsersListPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsersList());
    const currentUser = useSelector(getCurrentUserData());
    const currentUserId = useSelector(getCurrentUserId());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const professions = useSelector(getProfessions());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "null" });
    const pageSize = 5;

    const handleDelete = (userId) => {
        return users.filter((user) => user._id !== userId);
    };
    const handleToggleAdd = (id) => {
        const bookmarkedUserId = users.find((u) => u._id === id)._id;
        const newUsers = { ...currentUser };
        if (!currentUser.bookmarks) newUsers.bookmarks = [];
        newUsers.bookmarks = [...newUsers.bookmarks, bookmarkedUserId];
        dispatch(updateUser(newUsers));
    };
    const handleToggleRemove = (id) => {
        const NewbookmarkedUserIds = currentUser.bookmarks
            ? currentUser.bookmarks.filter((b) => b !== id)
            : [];
        const newUsers = { ...currentUser };
        newUsers.bookmarks = NewbookmarkedUserIds;
        dispatch(updateUser(newUsers));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    function filteUser(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf._id)
              )
            : data;
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filteUser(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    if (users) {
        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        className="form-control mt-1"
                        name="searchQuery"
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onHandleAdd={handleToggleAdd}
                            onHandleRemove={handleToggleRemove}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <h2 className=" d-flex justify-content-center">
            Загрузка данних о пользователях...
        </h2>
    );
};

UsersListPage.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onHandle: PropTypes.func
};

export default UsersListPage;
