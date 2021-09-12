import { useState, useEffect } from "react"
import InputDisplay from "./components/inputDisplay"
import LeftPanel from "./components/leftpanel"
import Operators from "./components/operators"

function App() {
    let [value, setValue] = useState("0")

    const resetBtn = () => {
        setValue("0")
    }

    const selectNumber = (number) => {
        return value === "0" ? setValue("" + number) : setValue(value + number)
    }

    const selectOperator = (operator) => {
        return operator
    }

    const result = (val) => {
        console.log(val)
    }

    return (
        <div className="calculator">
            <InputDisplay value={value} />
            <div className="buttons">
                <Operators operator={selectOperator} />
                <LeftPanel pushBtn={selectNumber} reset={resetBtn} />
                <div className="equal" onClick={() => result(value)}>
                    =
                </div>
            </div>
        </div>
    )
}

export default App
