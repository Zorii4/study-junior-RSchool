import React, { useEffect, useState } from "react"
import TextField from "../../common/form/textField"
import api from "../../../api"
import { useHistory, useParams } from "react-router"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import { validator } from "../../../utils/validator"
import PropTypes from "prop-types"

const UserEditPage = () => {
    const [dataUser, setDataUser] = useState()
    const [professions, setProfessions] = useState({})
    const [qualities, setQualities] = useState({})
    const [errors, setErrors] = useState({})
    const { userId } = useParams()
    const history = useHistory()

    useEffect(() => {
        validate()
    }, [dataUser])

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setDataUser(data)
        })
        api.professions.fetchAll().then((data) => {
            setProfessions(data)
        })
        api.qualities.fetchAll().then((data) => {
            setQualities(data)
        })
    }, [])

    const validatorConfig = {
        email: {
            isRequered: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
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
        let newValue = value
        if (name === "profession") {
            const arrayProfessions = Object.keys(professions).map((item) => ({
                name: professions[item].name,
                _id: professions[item]._id
            }))

            newValue = arrayProfessions.find((item) => item._id === newValue)
        }

        if (name === "qualities") {
            newValue = value.map((item) =>
                Object.values(qualities).find(
                    (qualitie) => qualitie._id === item.value
                )
            )
        }

        setDataUser((prevState) => ({ ...prevState, [name]: newValue }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate()) {
            api.users.update(userId, dataUser)
            backToUserPage()
        }
    }

    const backToUserPage = () => {
        history.push(`/users/${userId}/`)
    }

    if (!dataUser) return <>loading...</>

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
                                options={Object.keys(professions).map(
                                    (item) => ({
                                        name: professions[item].name,
                                        value: professions[item]._id
                                    })
                                )}
                                onChange={handleChange}
                                value={dataUser.profession._id}
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
                                label="Выберите ваши качества"
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                value={dataUser.qualities.map((qualitie) => ({
                                    label: qualitie.name,
                                    value: qualitie._id
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
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default UserEditPage
