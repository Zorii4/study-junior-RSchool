import React from "react"
import propTypes from "prop-types"

const Bookmark = ({ status, ...rest }) => {
    return (
        <i
            {...rest}
            className={"bi bi-heart" + (status ? "-fill" : "")}
            style={{ cursor: "pointer" }}
        ></i>
    )
}

Bookmark.propTypes = {
    status: propTypes.bool
}

export default Bookmark
