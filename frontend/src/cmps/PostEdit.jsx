import { connect } from 'react-redux'
import React, { Component } from 'react'
import { postService } from '../service/postService.js'
import { savePost } from '../store/actions/postActions'
import { Uploader } from './Uploader.jsx'

export class _PostEdit extends Component {

  state = {
    post: {
      title: '',
      createdAt: null,
      imgUrl: '',
      likes: [],
      comments: []
    }
  };

  componentDidMount() {
    this.loadPost()
  }

  loadPost = async () => {
    const { postId } = this.props.match.params;
    if (postId) {
      const post = await postService.getById(postId)
      this.setState({ post })
    }
  }

  handleInput = ({ target }) => {
    const { value, name } = target
    this.setState(prevState => {
      return {
        post: {
          ...prevState.post,
          [name]: value
        }
      }
    })
  }

  onUploadPostImage = (url) => {
    this.setState(prevState => {
      return {
        post: {
          ...prevState.post,
          imgUrl: url
        }
      }
    })
  }

  onSavePost = (ev) => {
    ev.preventDefault()
    const { post } = this.state

    this.props.savePost(post)
    console.log('post', post);
    this.props.history.push('/')
  }

  render() {
    const { post } = this.state
    return (
      <section className="edit-box">
        <h1>{post._id ? 'Edit Post' : 'Add Post'}</h1>
        <form onSubmit={this.onSavePost} className="post-form">
          <label>Title:
            <input type="text" name="title" value={post.title} onChange={this.handleInput} autoComplete="off" />
          </label>
          <Uploader onFinishUpload={this.onUploadPostImage} />
          <button className={this.state.post.imgUrl ? '' : 'disabled'}>Save</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postModule.posts
  }
}

const mapDispatchToProps = {
  savePost
}

export const PostEdit = connect(mapStateToProps, mapDispatchToProps)(_PostEdit)
