import React from "react"
import { useParams } from "react-router-dom"
import Users from "./users"
import UserInfo from "./userInfo"

const RouterDirection = () => {
    const params = useParams()
    const { userId } = params

    return <> {userId ? <UserInfo id={userId} /> : <Users />}</>
}

export default RouterDirection
