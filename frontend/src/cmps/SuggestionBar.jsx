import React, { Component } from 'react'
import { Avatar } from '@material-ui/core'


export class SuggestionBar extends Component {


    render() {
        const { suggestedUser } = this.props
        return (
            <section className="suggestion-preview ">

                <div className="avatar-icon flex flex-center">
                    <Avatar className="suggestion-avatar"
                            src={suggestedUser.imgUrl}
                    />
                    <div>
                        <h5>{suggestedUser.fullname}</h5>
                        <h5 className = "suggested">Suggested For You</h5>
                    </div>
                    <h5 className="follow">Follow</h5>
                </div>
            </section>
        )
    }
}
