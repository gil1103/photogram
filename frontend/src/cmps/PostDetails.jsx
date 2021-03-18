import { connect } from "react-redux";
import React, { Component } from "react";
import { postService } from "../service/postService.js";
import { removePost } from "../store/actions/postActions";
import { NavBar } from "./NavBar";
import { AddComment } from "./AddComment";
import Moment from "react-moment";
import { Avatar } from "@material-ui/core";
import { withRouter } from 'react-router-dom'


export class _PostDetails extends Component {
  state = {
    post: null,
    loggedInUserIsLike:false
  };

  componentDidMount() {
     this.loadPost()
  }

  loadPost = async () => {
    console.log("loadPost", this.props);
    const { postId } = this.props.match.params;
    const post = await postService.getById(postId);
    const { loggedInUser } = this.props
    const loggedInUserIsLike = post.likes.filter(like => like._id === loggedInUser._id)
    console.log(loggedInUserIsLike);
    this.setState({ post, loggedInUserIsLike });
  }

  onRemove = (postId) => {
    this.props.removePost(postId);
    this.props.history.push("/");
  }

  render() {
    const { post } = this.state;
    console.log("post:", post, "this.props:", this.props);
    const { postId } = this.props.match.params;
    if (!post) return <h1>Loading...</h1>;
    return (
      <section>
        <div className="post-details">
          <div className="details-mobile">
            <div className="details-header flex">
              <Avatar className="details-avatar" src={post.byUser.imgUrl} />
              <div className="details-created-by">{post.byUser.fullname}</div>
              <button className="details-dots flex  ">...</button>
            </div>
          </div>
          <div className="details-pic">
            <img src={post.imgUrl} alt="" />
          </div>
          <div className="description">
            <div className="post-details-container">
              <div className="post-desc">
                <div className="details-wide">
                  <div className="details-header flex">
                    <Avatar
                      className="details-avatar"
                      src={post.byUser.imgUrl}
                    />
                    <div className="details-created-by">
                      {post.byUser.fullname}
                    </div>
                    <button className="details-dots flex  ">...</button>
                  </div>
                </div>
                <span>
                  {post.comments.map((comment) => {
                    return (
                      <h5 className="detailed-comments" key={comment.id}>
                        {comment.txt}
                      </h5>
                    );
                  })}
                </span>
              </div>
            </div>
            <NavBar post={post} postId={postId} />
            {post.likes.length > 0 && (<p className="likes-count likes-on-postDetails">{post.likes.length} likes </p>)}
            <Moment className="time-span-details" fromNow>
              {post.comments &&
                post.comments[post.comments.length - 1]?.createdAt}
            </Moment>
            <AddComment post={post} postId={postId} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postModule.posts,
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  removePost,
};

export const PostDetails = connect(mapStateToProps,mapDispatchToProps)(withRouter(_PostDetails));
                      