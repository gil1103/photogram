import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostList } from '../cmps/PostList'
import { SuggestionBarList } from '../cmps/SuggestionBarList'
import { loadPosts, removePost } from '../store/actions/postActions'
import { loadUsers } from '../store/actions/userActions.js'
import _ from "lodash"
import { login } from '../store/actions/userActions.js' //for demo


class _GeogramApp extends Component {

     async componentDidMount () {
         const userCred = { username: 'gil', password: '111111' } //for demo only
         await this.props.login(userCred) //for demo only
         // if (!this.props.loggedInUser) this.props.history.push('/login')
         this.props.loadPosts()
         this.props.loadUsers()
         
     }

    onRemove = (postId) => {
        this.props.removePost(postId)
    }

    render() {
        const { posts, users, loggedInUser } = this.props
        const suggestedUsers = users.filter(user => !_.has(user, 'username'))
        return (
            <section className="post-suggestions-container flex">
                <PostList posts={posts} loggedInUser={loggedInUser} onRemove={this.onRemove} />
                <SuggestionBarList loggedInUser={loggedInUser}  suggestedUsers={suggestedUsers} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postModule.posts,
        loggedInUser: state.userModule.loggedInUser,
        users: state.userModule.users,
    }
}

const mapDispatchToProps = {
    loadPosts,
    removePost,
    loadUsers,
    login //for demo
}

export const GeogramApp = connect(mapStateToProps, mapDispatchToProps)(_GeogramApp);