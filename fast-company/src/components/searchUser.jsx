import React from "react"
import PropTypes from "prop-types"

const SearchUser = ({ searchValue, onSearchUser }) => {
    return (
        <div className="row">
            <div className="col-auto w-100 mt-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    name="search"
                    onChange={({ target }) => onSearchUser(target.value)}
                    className="form-control"
                />
            </div>
        </div>
    )
}

SearchUser.propTypes = {
    onSearchUser: PropTypes.func,
    searchValue: PropTypes.string
}

export default SearchUser
