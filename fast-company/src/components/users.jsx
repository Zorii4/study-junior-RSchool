import React, { useState } from "react"
import api from "../api"
import titles from "../utils/utils.js"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => () => {
        const newUsers = users.filter((item) => userId !== item._id)
        setUsers(newUsers)
    }

    const renderPhrase = (number) => {
        let title = ["человек", "человека", "человек"]
        if (number === 0) {
            return <span className="badge bg-danger">Никто с тобой не тусанёт</span>
        } else {
            return (
                <span className="badge bg-primary">
                    {number} {titles(number, title)} тусанет с тобой сегодня
                </span>
            )
        }
    }

    const renderTable = () => {
        return users.map((item) => {
            const span = item.qualities.map((el, index) => {
                let cl = `badge m-1 bg-${el.color}`
                return (
                    <span key={index} className={cl}>
                        {el.name}
                    </span>
                )
            })
            return (
                <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{span}</td>
                    <td>{item.profession.name}</td>
                    <td>{item.completedMeetings}</td>
                    <td>{item.rate}</td>
                    <td>
                        <button className="btn btn-danger" onClick={handleDelete(item._id)}>
                            delete
                        </button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            {renderPhrase(users.length)}
            {users.length ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            ) : (
                ""
            )}
        </>
    )
}
export default Users
