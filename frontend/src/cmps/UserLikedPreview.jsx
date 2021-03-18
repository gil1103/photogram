import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class _UserLikedPreview extends Component {

    render() {
        const { post } = this.props
        return (
            <Link to={`/post/${post._id}`}><div className="img-container">
                <img className="saved-img" src={post.imgUrl} alt='' />
            </div></Link>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postModule.posts,
        loggedInUser: state.userModule.loggedInUser
    }
}



export const UserLikedPreview = connect(mapStateToProps)(withRouter(_UserLikedPreview))

