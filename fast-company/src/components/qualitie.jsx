import React from "react"

const Qualitie = ({ qualities }) => {
    return (
        <span key={qualities.index} className={`badge m-1 bg-${qualities.color}`}>
            {qualities.name}
        </span>
    )
}
export default Qualitie
