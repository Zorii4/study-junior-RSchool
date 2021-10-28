import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import CommentsList from "../../ui/comments/commentsList"
import UserCard from "../../ui/usersCard/userCard"
import QualitiesCard from "../../ui/usersCard/qualitiesCard"
import MeetingsCard from "../../ui/usersCard/meetingsCard"

const UserPage = ({ id }) => {
    const [user, setUser] = useState()
    const [comments, setComments] = useState([])

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data)
        })
        loadComments()
    }, [])

    const loadComments = () => {
        api.comments.fetchCommentsForUser(id).then((data) => {
            setComments(data)
        })
    }
    const handleAddComment = (data) => {
        api.comments.add(data)
        loadComments()
    }

    const handleRemoveComment = (id) => {
        api.comments.remove(id)
        loadComments()
    }

    if (!user) return <>loading...</>

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} id={id} />
                    <QualitiesCard user={user} />
                    <MeetingsCard user={user} />
                </div>
                <div className="col-md-8">
                    <CommentsList
                        comments={comments}
                        onAddComment={handleAddComment}
                        onRemoveComment={handleRemoveComment}
                        id={id}
                    />
                </div>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
