import React, { useState } from "react"
import Users from "./components/users"
import SearchStatus from "./components/searchStatus"
import api from "./api"

function App() {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        const newUsers = users.filter((item) => userId !== item._id)
        setUsers(newUsers)
    }

    const handleBookmark = (userId) => {
        const markedUser = users.map((user) => {
            if (userId === user._id) {
                if (user.selected) {
                    return { ...user, selected: false }
                } else {
                    return { ...user, selected: true }
                }
            } else {
                return user
            }
        })
        return setUsers(markedUser)
    }

    return (
        <>
            <SearchStatus length={users.length} />
            <Users users={users} onDelete={handleDelete} onMarked={handleBookmark} />
        </>
    )
}

export default App
