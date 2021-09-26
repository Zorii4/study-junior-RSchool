import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../api"
import QualitiesList from "./qualitiesList"
import { useHistory } from "react-router-dom"

const userInfo = ({ id }) => {
    const [user, setUser] = useState()
    const history = useHistory()

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data)
        })
    })

    const handleBackBtn = () => {
        history.replace("/users")
    }

    if (!user) return <>loading...</>

    return (
        <>
            <h1>{user.name}</h1>
            <h2>{`Профессия: ${user.profession.name}`}</h2>
            <QualitiesList qualities={user.qualities} />
            <div>{`completedMeetings: ${user.completedMeetings}`}</div>
            <h2>{`Rate:${user.rate}`}</h2>
            <button onClick={() => handleBackBtn()}>Все Пользователи</button>
        </>
    )
}

userInfo.propTypes = {
    id: PropTypes.string.isRequired,
    handleBackBtn: PropTypes.func
}

export default userInfo
