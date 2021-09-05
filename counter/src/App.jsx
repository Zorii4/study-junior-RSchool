import React, { useState } from "react"
import Counters from "./component/counters"
import NavBar from "./component/navBar"

function App() {
    const initialState = [
        { value: 0, id: 1, name: "Ложка" },
        { value: 0, id: 2, name: "Вилка" },
        { value: 0, id: 3, name: "Тарелка" },
        { value: 0, id: 4, name: "Стартовый набор минималиста" },
        { value: 0, id: 5, name: "Ненужные вещи" },
    ]
    const [counters, setCounters] = useState(initialState)

    const handleDelete = (counterId) => {
        const newCounters = counters.filter((c) => c.id !== counterId)
        setCounters(newCounters)
    }

    const handleDecrement = (counterId) => {
        const newCounters = counters.map((count) => {
            if (count.value > 0) {
                return count.id === counterId ? { ...count, value: count.value - 1 } : count
            } else {
                return count
            }
        })
        setCounters(newCounters)
    }

    const handleIncrement = (counterId) => {
        const newCounters = counters.map((count) =>
            count.id === counterId ? { ...count, value: count.value + 1 } : count
        )
        setCounters(newCounters)
    }

    const handleReset = () => setCounters(initialState)
    return (
        <div className="col-lg-8 mx-auto p-3 py-md-5">
            <main>
                <NavBar totalItems={counters.reduce((a, c) => a + c.value, 0)} />
                <Counters
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onReset={handleReset}
                    onDelete={handleDelete}
                    counters={counters}
                />
            </main>
        </div>
    )
}

export default App
