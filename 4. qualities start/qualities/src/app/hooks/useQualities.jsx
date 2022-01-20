import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import qualityService from "../services/quality.service"

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}
export const QualitiesProvider = ({ children }) => {
    const [qualites, setQualities] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll()
                setQualities(content)
                setLoading(false)
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities()
    }, [])

    const getQuality = (id) => {
        return qualites.find((q) => q._id === id)
    }

    const updateQuality = async ({ _id: id, ...data }) => {
        try {
            const { content } = await qualityService.update(id, data)
            setQualities((prev) =>
                prev.map((item) => {
                    if (item._id === content._id) {
                        return content
                    }
                    return item
                })
            )
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }

    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data)
            setQualities((prev) => [...prev, content])
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }

    const deleteQuality = async (id) => {
        try {
            const { content } = await qualityService.delete(id)
            setQualities((prev) => {
                return prev.filter((item) => item._id !== content._id)
            })
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return (
        <QualitiesContext.Provider
            value={{ qualites, getQuality, updateQuality, addQuality, deleteQuality }}
        >
            {!isLoading ? children : "Qualities loading..."}
        </QualitiesContext.Provider>
    )
}
