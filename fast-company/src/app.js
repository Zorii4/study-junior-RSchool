import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import MainPage from "./layouts/mainPage"
import NavBar from "./components/ui/navBar"
import Login from "./layouts/login"
import Users from "./layouts/users"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./hooks/useProfession"
import { QualitiesProvider } from "./hooks/useQualities"
import AuthProvider from "./hooks/useAuth"

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={MainPage} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
