import React from "react"

const LeftPanel = ({ pushBtn, reset }) => {
    return (
        <div className="leftPanel">
            <div className="numbers">
                <div onClick={() => pushBtn(7)}>7</div>
                <div onClick={() => pushBtn(8)}>8</div>
                <div onClick={() => pushBtn(9)}>9</div>
            </div>
            <div className="numbers">
                <div onClick={() => pushBtn(4)}>4</div>
                <div onClick={() => pushBtn(5)}>5</div>
                <div onClick={() => pushBtn(6)}>6</div>
            </div>
            <div className="numbers">
                <div onClick={() => pushBtn(1)}>1</div>
                <div onClick={() => pushBtn(2)}>2</div>
                <div onClick={() => pushBtn(3)}>3</div>
            </div>
            <div className="numbers">
                <div onClick={() => pushBtn(0)}>0</div>
                <div onClick={() => pushBtn(".")}>.</div>
                <div onClick={() => reset()}>AC</div>
            </div>
        </div>
    )
}

export default LeftPanel
