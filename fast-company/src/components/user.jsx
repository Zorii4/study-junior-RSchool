import React from "react"
import Qualitie from "./qualitie"
import Bookmark from "./bookmark"
import propTypes from "prop-types"

const User = ({ user, onDelete, onMarked }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => (
                    <Qualitie qualities={item} key={item._id} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <Bookmark user={user} onMarkedSelect={onMarked} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        onDelete(user._id)
                    }}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    user: propTypes.object.isRequired,
    onDelete: propTypes.func.isRequired,
    onMarked: propTypes.func.isRequired
}

export default User
