import React from "react"

const Operators = ({ operator }) => {
    return (
        <div className="operators">
            <div onClick={() => operator("+")}>+</div>
            <div onClick={() => operator("-")}>-</div>
            <div onClick={() => operator("*")}>*</div>
            <div onClick={() => operator("/")}>/</div>
        </div>
    )
}

export default Operators
