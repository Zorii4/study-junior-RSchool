import React, { useState } from "react";

const withAuth = (Component) => (props) => {
    localStorage.clear();
    const [isAuth, setIsAuth] = useState(false);
    const onLogin = () => {
        localStorage.setItem("user", true);
        setIsAuth(true);
    };
    const onLogOut = () => {
        localStorage.removeItem("user");
        setIsAuth(false);
    };
    return (
        <Component
            {...props}
            isAuth={isAuth}
            onLogOut={onLogOut}
            onLogin={onLogin}
        />
    );
};

export default withAuth;
