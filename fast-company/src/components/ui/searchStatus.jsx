import React from "react"
import titles from "../../utils/utils.js"
import propTypes from "prop-types"

const SearchStatus = ({ length }) => {
    const title = ["человек", "человека", "человек"]
    if (length === 0) {
        return <span className="badge bg-danger">Никто с тобой не тусанёт</span>
    } else {
        return (
            <span className="badge bg-primary">
                {length} {titles(length, title)} тусанет с тобой сегодня
            </span>
        )
    }
}

SearchStatus.propTypes = {
    length: propTypes.number.isRequired
}

export default SearchStatus
