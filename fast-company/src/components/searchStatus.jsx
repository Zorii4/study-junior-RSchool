import React from "react"
import titles from "../utils/utils.js"

const SearchStatus = ({ length }) => {
    let title = ["человек", "человека", "человек"]
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

export default SearchStatus
