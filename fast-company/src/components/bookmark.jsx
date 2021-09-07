import propTypes from "prop-types"
import React from "react"

const Bookmark = ({ user, onMarkedSelect }) => {
    const styleSelect = user.selected ? "-fill" : ""
    const styleMark = `bi bi-heart${styleSelect}`
    return (
        <i
            className={styleMark}
            style={{ cursor: "pointer" }}
            onClick={() => onMarkedSelect(user._id)}
        ></i>
    )
}

export default Bookmark

Bookmark.propTypes = {
    user: propTypes.array.isRequired,
    onMarkedSelect: propTypes.func.isRequired
}
