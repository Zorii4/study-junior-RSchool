import React, { useState, useEffect } from "react"
import Pagination from "../components/pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "../components/groupList"
import api from "../api"
import SearchStatus from "../components/searchStatus"
import UserTable from "../components/usersTable"
import _ from "lodash"

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })

    const pageSize = 8

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data)
        })
    }, [])

    const handleDelete = (userId) => {
        const newUsers = users.filter((item) => userId !== item._id)
        setUsers(newUsers)
    }

    const handleBookmark = (userId) => {
        const markedUser = users.map((user) => {
            if (userId === user._id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        return setUsers(markedUser)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filtredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users
        const count = filtredUsers.length
        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        )
        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && (
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
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onMarkedSelect={handleBookmark}
                            selectedSort={sortBy}
                            onSort={handleSort}
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
        )
    }
    return "loading..."
}

Users.propTypes = {
    users: PropTypes.array,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number
}

export default Users
