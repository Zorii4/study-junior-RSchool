import React, { useState, useEffect } from "react"
import Users from "./components/users"
import api from "./api"

function App() {
    const [users, setUsers] = useState([])

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
            <Users
                users={users}
                onDelete={handleDelete}
                onMarked={handleBookmark}
            />
        </>
    )
}

export default App
