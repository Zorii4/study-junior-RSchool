import React, { useEffect, useState, useMemo } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

function runFactorial(n) {
    console.log("run factorial");
    return factorial(n);
}

const ComplexCalculateExample = () => {
    const [value, setValue] = useState(100);
    const [otherState, setOtherState] = useState(false);

    const buttonColor = otherState ? "primary" : "secondary";

    const fact = useMemo(() => runFactorial(value), [value]);
    useEffect(() => {
        console.log("render");
    });

    return (
        <>
            <CardWrapper>
                <SmallTitle>Кэширование сложных вычислений</SmallTitle>
                <p>Value: {value}</p>
                <p>Result fact: {fact}</p>
                <button
                    className="btb btn-primary mx-2"
                    onClick={() => setValue((prev) => prev + 10)}
                >
                    Increment
                </button>
                <button
                    className="btb btn-primary mx-2"
                    onClick={() => setValue((prev) => prev - 10)}
                >
                    Decrement
                </button>
            </CardWrapper>
            <CardWrapper>
                <SmallTitle>Зависимость от сторонних setState</SmallTitle>
                <button
                    className={"btn ms-md-2 btn-" + buttonColor}
                    onClick={() => {
                        setOtherState((prev) => !prev);
                    }}
                >
                    Change color
                </button>
            </CardWrapper>
        </>
    );
};

export default ComplexCalculateExample;
