import React from "react"
import { useQualities } from "../../hooks/useQualities"
import PropTypes from "prop-types"
import Qualitie from "./qualities/qualitie"

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities()

    const quality = getQuality(id)

    if (!isLoading) {
        return (
            <>
                {quality.map((q) => (
                    <Qualitie key={q._id} qualities={q} />
                ))}
            </>
        )
    } else {
        return "Loading..."
    }
}

Quality.propTypes = {
    id: PropTypes.array
}

export default Quality
