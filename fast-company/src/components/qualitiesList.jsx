import React from "react"
import PropTypes from "prop-types"
import Qualitie from "./qualitie"

const QualitiesList = ({ ...user }) => {
    return (
        <>
            {user.qualities.map((item) => (
                <Qualitie qualities={item} key={item._id} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    user: PropTypes.array
}

export default QualitiesList
