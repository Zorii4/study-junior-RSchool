import React from "react"
import { useParams } from "react-router-dom"
import UserPage from "../components/page/userPage"
import UsersListPage from "../components/page/usersListPage"
import UserEditPage from "../components/page/userEditPage"
import UserProvider from "../hooks/useUsers"

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    /*eslint-disable*/
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserEditPage id={userId} />
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    )
}
/*eslint-disable*/
export default Users
