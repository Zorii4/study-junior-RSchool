import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import userService from "../services/user.service"
import { toast } from "react-toastify"
import localStorageService, {
    setTokens
} from "../services/localStorage.service"
import { useHistory } from "react-router-dom"

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    function logOut() {
        localStorageService.removeAuthData()
        setUser(null)
        history.push("/")
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    }
                    throw errorObject
                }
            }
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            setTokens(data)
            await getUserData()
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Email или пароль введены некорректно")
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (localStorageService.getAcessToken) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function editUser(data) {
        try {
            const { content } = await userService.updateUser(data._id, data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, currentUser, logOut, editUser }}
        >
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
