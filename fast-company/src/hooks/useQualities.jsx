import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { toast } from "react-toastify"
import qualitiesService from "../services/quality.service"

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        getQualitiesList()
    }, [])

    function getQuality(idList) {
        const qualityList = []
        for (let i = 0; i < idList.length; i++) {
            qualityList.push(qualities.find((q) => q._id === idList[i]))
        }
        return qualityList
    }

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.get()
            setQualities(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
        setLoading(false)
    }

    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    )
}
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
