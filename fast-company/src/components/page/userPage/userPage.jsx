import React from "react"
import PropTypes from "prop-types"
import UserCard from "../../ui/usersCard/userCard"
import QualitiesCard from "../../ui/usersCard/qualitiesCard"
import MeetingsCard from "../../ui/usersCard/meetingsCard"
import { useUser } from "../../../hooks/useUsers"
import { CommentsProvider } from "../../../hooks/useComments"
import Comments from "../../ui/comments"

const UserPage = ({ id }) => {
    const { getUserById } = useUser()
    const user = getUserById(id)

    if (!user) return <>loading...</>

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserCard user={user} id={id} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <CommentsProvider>
                        <Comments />
                    </CommentsProvider>
                </div>
            </div>
        </div>
    )
}

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserPage
