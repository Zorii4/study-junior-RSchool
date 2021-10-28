import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Avatar from "../avatar"
import api from "../../../api"
import { dateFormat } from "../../../utils/dateFormat"

const Comment = ({ comment, removeComment }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data)
        })
    }, [])

    const commentOfUser = users.find((user) => user._id === comment.userId)

    /*eslint-disable*/
    return users && commentOfUser ? (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <Avatar width={"65"} height={"65"} />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {commentOfUser.name}
                                        <span className="small">
                                            {` - ${dateFormat(
                                                comment.created_at
                                            )}`}
                                        </span>
                                    </p>
                                    <button
                                        onClick={() => {
                                            removeComment(comment._id)
                                        }}
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        "loading..."
    )
}
/*eslint-disable*/
Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    removeComment: PropTypes.func
}

export default Comment
