import React from "react"
import { Route, Switch } from "react-router-dom"
import MainPage from "./components/mainPage"
import NavBar from "./components/navBar"
import Login from "./components/login"
import RouterDirection from "./components/routerDirection"

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={RouterDirection} />
            </Switch>
        </>
    )
}

export default App
