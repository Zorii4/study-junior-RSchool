import React, { useState, useEffect } from "react"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import UserTable from "../../ui/usersTable"
import _ from "lodash"
import SearchUser from "../../ui/searchUser"
import { useUser } from "../../../hooks/useUsers"
import { useProfessions } from "../../../hooks/useProfession"
import { useAuth } from "../../../hooks/useAuth"

const UsersListPage = () => {
    const { users } = useUser()
    const { isLoading: professionsLoading, professions } = useProfessions()
    const { currentUser } = useAuth()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
    const [dataSearch, setDataSearch] = useState("")

    const pageSize = 8

    const handleDelete = (userId) => {
        // const newUsers = users.filter((item) => userId !== item._id)
        console.log(userId)
    }

    const handleBookmark = (userId) => {
        const markedUser = users.map((user) => {
            if (userId === user._id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // return setUsers(markedUser)
        console.log(markedUser)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        setDataSearch("")
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    function filterUsers(data) {
        let filtredUsers = selectedProf
            ? data.filter((user) => user.profession._id === selectedProf._id)
            : data

        filtredUsers = filtredUsers.filter((item) => {
            return item.name.toLowerCase().includes(dataSearch.toLowerCase())
        })
        return filtredUsers.filter((u) => u._id !== currentUser._id)
    }
    const filtredUsers = filterUsers(users)
    const count = filtredUsers.length
    const sortedUsers = _.orderBy(filtredUsers, [sortBy.path], [sortBy.order])

    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectedProf()
    }

    const handleChangeSearch = (value) => {
        setDataSearch(value)
        clearFilter()
    }

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
                <SearchUser
                    onSearchUser={handleChangeSearch}
                    searchValue={dataSearch}
                />
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

UsersListPage.propTypes = {
    users: PropTypes.array,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    onSearchUser: PropTypes.func
}

export default UsersListPage
