import React, { useState, useEffect } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
import TextField from "../../common/form/textField";
import PropTypes from "prop-types";

const FormComponent = ({ children }) => {
    const [data, setData] = useState({});
    useEffect(() => {
        console.log(data);
    }, [data]);
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    return React.Children.map(children, (child) => {
        const config = {
            ...child.props,
            onChange: handleChange,
            value: data[child.props.name] || ""
        };
        React.cloneElement(child, config);
        return React.cloneElement(child, config);
    });
};
FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
const ReactChildrenExample = () => {
    return (
        <CardWrapper>
            <SmallTitle>Clone form and add props</SmallTitle>
            <Divider />
            <FormComponent>
                <TextField name="email" label="email" />
                <TextField name="password" label="password" type="password" />
            </FormComponent>
        </CardWrapper>
    );
};

export default ReactChildrenExample;
