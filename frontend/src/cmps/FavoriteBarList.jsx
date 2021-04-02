import { connect } from 'react-redux'
import React, { Component } from 'react'
import {FavoriteBar} from './FavoriteBar'
import OverflowScrolling from 'react-overflow-scrolling';

export class _FavoriteBarList extends Component {



    render() {
        const { loggedInUser } = this.props
        return (
            <div className="avatr-container">
               {loggedInUser && <OverflowScrolling className="avatar-list">
                    {loggedInUser.favorites?.map(favorite => {
                        return <FavoriteBar key={favorite.id} favorite={favorite} />
                    })}
                </OverflowScrolling>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}

export const FavoriteBarList = connect(mapStateToProps)(_FavoriteBarList);