import React, { useEffect, useState } from "react"
import TextField from "../../common/form/textField"
import { useHistory } from "react-router"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { validator } from "../../../utils/validator"
import PropTypes from "prop-types"
import { useUser } from "../../../hooks/useUsers"
import { useProfessions } from "../../../hooks/useProfession"
import { useQualities } from "../../../hooks/useQualities"
import { useAuth } from "../../../hooks/useAuth"

const UserEditPage = ({ id }) => {
    const { currentUser } = useAuth()
    const { professions } = useProfessions()
    const { qualities } = useQualities()
    const { getUserById } = useUser()
    const { editUser } = useAuth()
    const [errors, setErrors] = useState({})
    const [dataUser, setDataUser] = useState(getUserById(id))
    const history = useHistory()

    if (currentUser._id !== id) {
        setTimeout(() => {
            history.push(`/users/${currentUser._id}/edit`)
        })
    }

    useEffect(() => {
        setDataUser(getUserById(id))
    }, [id])

    useEffect(() => {
        validate()
    }, [dataUser])

    const validatorConfig = {
        email: {
            isRequered: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequered: {
                message: "Имя обязательно для заполнения"
            }
        }
    }

    const validate = () => {
        const errors = validator(dataUser, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleChange = ({ name, value }) => {
        if (name === "qualities") {
            value = value.map((item) => item.value)
        }
        setDataUser((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            console.log(dataUser)
            editUser(dataUser)
            backToUserPage()
        }
    }

    const backToUserPage = () => {
        history.push(`/users/${id}/`)
    }

    if (!dataUser || !professions || !qualities) return <>loading...</>

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <button
                        className="btn btn-primary"
                        onClick={backToUserPage}
                    >
                        Назад
                    </button>
                    <form onSubmit={handleSubmit}>
                        <div className="container mb-4 mt-4">
                            <TextField
                                label="Имя"
                                type="text"
                                name="name"
                                value={dataUser.name}
                                onChange={handleChange}
                            />

                            <TextField
                                label="Электронная почта"
                                type="text"
                                name="email"
                                value={dataUser.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                label="Выбери свою профессию"
                                name="profession"
                                options={professions.map((profession) => ({
                                    label: profession.name,
                                    value: profession._id
                                }))}
                                onChange={handleChange}
                                value={dataUser.profession}
                                defaultOption="Choose..."
                            />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={dataUser.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                name="qualities"
                                label="Выберите ваши качества"
                                options={qualities.map((quality) => ({
                                    label: quality.name,
                                    value: quality._id
                                }))}
                                onChange={handleChange}
                                value={dataUser.qualities.map((quality) => ({
                                    label: qualities.find(
                                        (q) => q._id === quality
                                    ).name,
                                    value: quality
                                }))}
                            />

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

UserEditPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default UserEditPage
