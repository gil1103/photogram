import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadPosts, savePost, removePost } from '../store/actions/postActions'
import { UserPostList } from '../cmps/UserPostList.jsx'
import { UserSavedList } from '../cmps/UserSavedList.jsx'
import { UserLikedList } from '../cmps/UserLikedList.jsx'
import { Uploader } from '../cmps/Uploader.jsx'
import { Avatar } from '@material-ui/core'
import { postService } from './../service/postService';

export class _UserDetails extends Component {
  state = {
    userPosts: null,
    option: 'post',
    post: {
      title: '',
      createdAt: null,
      imgUrl: '',
      likes: [],
      comments: []
    }
  }

  componentDidMount() {
    this.props.match.path === '/profile/saved' ? this.setState({ option: 'saved' }) : this.setState({ option: 'post' })
    this.props.match.path === '/profile/liked' ? this.setState({ option: 'liked' }) : this.setState({ option: 'post' })
    this.props.loadPosts()
    const userPosts = this.getUserPosts()
    this.setState({ userPosts })

  }

  onEditPost = (postId) => {
    console.log('postId-onEditPost', postId);
    this.loadPost(postId)
    this.onToggleOption('igtv')
  }

  loadPost = async (postId) => {
    if (postId) {
      console.log('postId-loadPost', postId);
      const post = await postService.getById(postId)
      console.log('post-loadPost', post);
      this.setState({ post })
    }
  }

  onToggleOption = (option) => {
    this.setState({ option })
  }

  onRemove = (postId) => {
    this.props.removePost(postId)
  }

  getUserPosts = () => {
    const userPosts = this.props.posts.filter(post => {
      return post.byUser._id === this.props.loggedInUser._id
    })
    return userPosts
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
    this.props.history.push('/')
  }

  render() {
    const { loggedInUser, posts } = this.props
    const { post, userPosts } = this.state
    return (
      <section className="user-details">
        <div className="user-container">
          <header className="user-profile-header">
            <div className="user-profile-img-cont flex ">
              <Avatar className="user-profile-img"
                src={loggedInUser.imgUrl}
              />
            </div>
            <section className="user-details-container">
              <div className="user-details-heading">
                <div className="user-details-1st-row">
                  <h2 className="user-details-name">{loggedInUser.fullname}</h2>
                  <div className="edit-profile-container-wide">
                    <span className="edit-profile-wide" >Edit Profile</span>
                  </div>
                  <div className="options-container">
                    <button className="user-detail-options">
                      <svg className="options-img" aria-label="Options" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clipRule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fillRule="evenodd"></path></svg>
                    </button>
                  </div>
                </div>
                <div className="edit-profile-container-mobile">
                  <span className="edit-profile-mobile" >Edit Profile</span>
                </div>
              </div>
              <ul className="user-status">
                <li><span>{this.state.userPosts?.length>0 ? this.state.userPosts?.length : '' }</span> {this.state.userPosts?.length>1 ? 'posts' : 'post' }</li>
                <li><span>50</span> followers</li>
                <li><span>20</span> following</li>
              </ul>
              <div className="name-wide">
                <h1>{loggedInUser.nickname}</h1>
              </div>
            </section>
          </header>
          <div className="user-details-mobile">
            <div className="name-mobile">
              <h1>{loggedInUser.nickname}</h1>
            </div>
            <ul className="user-status-mobile">
              <li><span>{this.state.userPosts?.length}</span> post</li>
              <li><span>50</span>followers</li>
              <li><span>20</span>following</li>
            </ul>
          </div>
          <div className="actions-container">
            <span className="user-actions-container">
              <span className="user-actions" onClick={() => this.onToggleOption('post')}><svg className="user-actions-img" aria-label="Posts" fill="#262626" viewBox="0 0 48 48" ><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
                <span className="actions"><span className="action-name">posts</span></span>
              </span>
            </span>
            <span className="user-actions-container">
              <span className="user-actions" onClick={() => this.onToggleOption('igtv')}><svg className="user-actions-img" aria-label="Posts" fill="#8e8e8e" viewBox="0 0 48 48" ><path d="M41 10c-2.2-2.1-4.8-3.5-10.4-3.5h-3.3L30.5 3c.6-.6.5-1.6-.1-2.1-.6-.6-1.6-.5-2.1.1L24 5.6 19.7 1c-.6-.6-1.5-.6-2.1-.1-.6.6-.7 1.5-.1 2.1l3.2 3.5h-3.3C11.8 6.5 9.2 7.9 7 10c-2.1 2.2-3.5 4.8-3.5 10.4v13.1c0 5.7 1.4 8.3 3.5 10.5 2.2 2.1 4.8 3.5 10.4 3.5h13.1c5.7 0 8.3-1.4 10.5-3.5 2.1-2.2 3.5-4.8 3.5-10.4V20.5c0-5.7-1.4-8.3-3.5-10.5zm.5 23.6c0 5.2-1.3 7-2.6 8.3-1.4 1.3-3.2 2.6-8.4 2.6H17.4c-5.2 0-7-1.3-8.3-2.6-1.3-1.4-2.6-3.2-2.6-8.4v-13c0-5.2 1.3-7 2.6-8.3 1.4-1.3 3.2-2.6 8.4-2.6h13.1c5.2 0 7 1.3 8.3 2.6 1.3 1.4 2.6 3.2 2.6 8.4v13zM34.6 25l-9.1 2.8v-3.7c0-.5-.2-.9-.6-1.2-.4-.3-.9-.4-1.3-.2l-11.1 3.4c-.8.2-1.2 1.1-1 1.9.2.8 1.1 1.2 1.9 1l9.1-2.8v3.7c0 .5.2.9.6 1.2.3.2.6.3.9.3.1 0 .3 0 .4-.1l11.1-3.4c.8-.2 1.2-1.1 1-1.9s-1.1-1.2-1.9-1z"></path></svg>
                <span className="actions"><span className="action-name">igtv</span></span>
              </span>
            </span>
            <span className="user-actions-container">
              <span className="user-actions" onClick={() => this.onToggleOption('saved')}><svg className="user-actions-img" aria-label="Saved" fill="#8e8e8e" viewBox="0 0 48 48" ><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                <span className="actions"><span className="action-name">saved</span></span>
              </span>
            </span>
            <span className="user-actions-container">
              <span className="user-actions" onClick={() => this.onToggleOption('tagged')}><svg className="user-actions-img" aria-label="Tagged" fill="#8e8e8e" viewBox="0 0 48 48" ><path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path></svg>
                <span className="actions"><span className="action-name">tagged</span></span>
              </span>
            </span>
          </div>
          {this.state.option === 'post' && <div className="postlist-container">
            <UserPostList posts={posts} loggedInUser={loggedInUser} onRemove={this.onRemove} onEditPost={this.onEditPost} />
          </div>}
          {this.state.option === 'igtv' &&
            <form onSubmit={this.onSavePost} className="upload-form">
              <Uploader onFinishUpload={this.onUploadPostImage} />
              <label className="title-container"><h1 className="uploading-title">Upload a Picture</h1>
                <input type="text" name="title" value={post.title} onChange={this.handleInput} autoComplete="off" />
              </label>
              <button className="upload-btn">Upload</button>
            </form>}
          {this.state.option === 'saved' && <div className="postlist-container">
            <UserSavedList userPosts={userPosts} loggedInUser={loggedInUser} />
          </div>}
          {this.state.option === 'liked' && <div className="postlist-container">
            <UserLikedList posts={userPosts} loggedInUser={loggedInUser} />
          </div>}
          {this.state.option === 'tagged' &&
            <section className="tagged-container">
              <div className="tagged">
                <div className="tagged-image"> </div>
                <div className="tagged-heading-cont">
                  <h1 className="tagged-heading">Photos of you</h1>
                </div>
                <div className="bottom-heading-cont">
                  <h1 className="bottom-heading">When people tag you in photos, they'll appear here</h1>
                </div>
              </div>
            </section>}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser,
    posts: state.postModule.posts
  }
}

const mapDispatchToProps = {
  loadPosts,
  savePost,
  removePost
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails);