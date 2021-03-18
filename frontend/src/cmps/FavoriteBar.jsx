import React, { Component } from "react";
import { Avatar } from "@material-ui/core";

export class FavoriteBar extends Component {
  render() {
    const { favorite } = this.props;
    return (
      <div className="avatar-icon flex flex-column flex-center">
        <div className="favorite-avatar-outer-border">
          <Avatar className="favorite-avatar" src={favorite.imgUrl} />
        </div>
        <h5>{favorite.fullname}</h5>
      </div>
    );
  }
}
