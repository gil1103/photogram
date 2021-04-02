import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveComment, toggleFocus } from '../store/actions/postActions'

export class _AddComment extends Component {

    state = {
        currComment: {
            txt: ''
        }
    }
    
    onSaveComment = async (ev) => {
        ev.preventDefault()
        const { txt } = this.state.currComment
        const { post, loggedInUser } = this.props
        await this.props.saveComment(txt, post._id, loggedInUser)
        this.setState({ currComment: { txt: '' } })
    }

    handleInput = ({ target }) => {
        const value = target.value
        this.setState(prevState => {
            return {
                currComment: {
                    ...prevState.currComment, txt: value
                }
            }
        })
    }

    render() {
        const {postId} = this.props
        return (
            <div className="comment-form-wrapper">
                <form onSubmit={this.onSaveComment} className={postId? "add-comment-form": "add-comment-form detailed"}>
                    <input type="text"  ref={ input =>postId && this.props.isCommentFocus   && input && input.focus() }   
                        name="description" value={this.state.currComment.txt} onChange={this.handleInput} placeholder="Add a comment..." />
                    <button type="submit" className={this.state.currComment.txt ? '' : 'disabled'}>Post</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.postModule.posts,
        isCommentFocus:state.postModule.isCommentFocus,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    saveComment,
    toggleFocus
}

export const AddComment = connect(mapStateToProps, mapDispatchToProps)(_AddComment)