import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import SelectField from "../../common/form/selectField"
import api from "../../../api"
import TextAreaField from "../../common/form/textAreaField"
import { validator } from "../../../utils/validator"

const NewCommentCard = ({ addComment, id }) => {
    const [users, setUsers] = useState([])
    const [data, setData] = useState({
        user: "",
        comment: ""
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data)
        })
    }, [])

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const validatorConfig = {
        comment: {
            isRequered: {
                message: "Обязательно для заполнения"
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            addComment({
                pageId: id,
                userId: data.user,
                content: data.comment
            })
            setData({
                user: "",
                comment: ""
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <SelectField
                name="user"
                defaultOption="Выберите пользователя"
                options={users.map((user) => ({
                    name: user.name,
                    value: user._id
                }))}
                value={data.user}
                onChange={handleChange}
            />
            <TextAreaField
                label="Сообщение"
                name="comment"
                rows={3}
                onChange={handleChange}
                value={data.comment}
                error={errors.comment}
            />

            <button className="btn btn-primary float-end" disabled={!isValid}>
                Опубликовать
            </button>
        </form>
    )
}

NewCommentCard.propTypes = {
    addComment: PropTypes.func,
    id: PropTypes.string
}

export default NewCommentCard
