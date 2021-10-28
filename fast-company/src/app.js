import React from "react"
import { Route, Switch } from "react-router-dom"
import MainPage from "./layouts/mainPage"
import NavBar from "./components/ui/navBar"
import Login from "./layouts/login"
import Users from "./layouts/users"

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
            </Switch>
        </>
    )
}

export default App
