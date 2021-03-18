import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar } from "./NavBar";
import { AddComment } from "./AddComment";
import Moment from "react-moment";
import { Avatar } from "@material-ui/core";

export class _PostPreview extends Component {
  state = {
    likes: {
      _id: "",
      fullname: "",
      imgUrl: "",
    },
    currComment: {
      txt: "",
    },
  };

  render() {
    const { post } = this.props;
    const avatarStyle = {
      border: "2px solid white"
    }

    const avatarContainerStyle = {
      border: "3px solid red",
      borderRadius: "50%"
    }


    return (
      <section className="post-preview ">
        <div className="preview-header flex">
          <Link to={`/post/${post._id}`}>
            <div className="preview-header-container flex flex-space-between">
              <div style = {avatarContainerStyle}> 
                <Avatar style = {avatarStyle}  src={post && post.byUser?.imgUrl} />
              </div>
              <h1>{post && post.byUser?.fullname}</h1>
            </div>
          </Link>
          <button className="flex  ">...</button>
        </div>
        <img className="post-img" src={post.imgUrl} alt="" />
        <NavBar post={post} />
        <div className="post-info">
          {post.likes?.length > 0 && (
            <p className="likes-count">{post.likes.length} likes </p>
          )}
          <div className="post-desc">
            <div className="comment-preview flex">
              <h5 className="created-by">
                {post.comments?.length > 0 && post.comments[0].by.fullname}{" "}
                &nbsp;
              </h5>
              <span>{post.comments?.length > 0 && post.comments[0].txt}</span>
            </div>

            {post.comments?.length > 0 &&
              post.comments.slice(1).map((comment) => {
                return (
                  <div key={comment.id} className="comment-preview flex">
                    <h5 className="created-by">{comment.by.fullname} &nbsp;</h5>
                    <span>{comment.txt}</span>
                  </div>
                );
              })}
          </div>
          <Moment className="time-span" fromNow>
            {post?.createdAt}
          </Moment>
        </div>
        <AddComment post={post} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser
  };
};

export const PostPreview = connect(mapStateToProps)(withRouter(_PostPreview));
