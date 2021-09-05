import React from "react"

const Counter = ({ id, value, name, onIncrement, onDecrement, onDelete }) => {
    const formValue = () => {
        return value === 0 ? "Ноль" : value
    }

    const getBadgeClasses = () => {
        let classes = "badge m-2 bg-"
        classes += value === 0 ? "danger" : "primary"
        return classes
    }

    return (
        <>
            <div>
                <h4>{name}</h4>
                <span className={getBadgeClasses()}>{formValue()}</span>
                <button onClick={() => onIncrement(id)} className="btn btn-secondary m-1 btn-sm">
                    Increment
                </button>
                <button onClick={() => onDecrement(id)} className="btn btn-secondary m-1 btn-sm">
                    Decrement
                </button>
                <button className="btn btn-danger bt-sm m-2" onClick={() => onDelete(id)}>
                    Delete
                </button>
            </div>
        </>
    )
}

export default Counter
