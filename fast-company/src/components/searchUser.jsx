import React from "react"
import PropTypes from "prop-types"

const SearchUser = ({ searchValue, onSearchUser }) => {
    return (
        <form action="">
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                name="search"
                onChange={({ target }) => onSearchUser(target.value)}
            />
        </form>
    )
}

SearchUser.propTypes = {
    onSearchUser: PropTypes.func,
    searchValue: PropTypes.string
}

export default SearchUser
