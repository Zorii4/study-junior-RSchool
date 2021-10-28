import React from "react"
import PropTypes from "prop-types"
import NewCommentCard from "./newCommentCard"
import Comment from "./comment"

const CommentsList = ({ comments, onAddComment, id, onRemoveComment }) => {
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <NewCommentCard addComment={onAddComment} id={id} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((comment) => (
                        <Comment
                            comment={comment}
                            key={comment._id}
                            removeComment={onRemoveComment}
                        />
                    ))}
                </div>
            </div>{" "}
        </>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.object,
    onAddComment: PropTypes.func,
    id: PropTypes.string,
    onRemoveComment: PropTypes.func
}

export default CommentsList
