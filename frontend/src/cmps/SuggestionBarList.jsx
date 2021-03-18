import { Avatar } from '@material-ui/core'
import { SuggestionBar } from './SuggestionBar'
import { connect } from 'react-redux'
import React from 'react'

function _SuggestionBarList({ suggestedUsers , loggedInUser }) {
    return <article className="suggestions-container" >
        
        <div className="first-avatar-icon flex ">
            <Avatar className="my-suggestion-avatar"
               src= {loggedInUser && loggedInUser.imgUrl} alt=''
            />
            <div className="flex flex-column">
                <h5>{loggedInUser && loggedInUser.fullname}</h5>
                <h5>{loggedInUser && loggedInUser.nickname}</h5>
            </div>
            <h5 className="switch"> Switch</h5>
        </div>
        <div className="suggested-people flex flex-space-between " >
            <h5> Suggestions For You </h5>
            <h5 className="see-all"> See All </h5>
        </div>
        {suggestedUsers.map(suggestedUser => {
            return <SuggestionBar key={suggestedUser._id} suggestedUser={suggestedUser} />
        })}

        <div>
            <div className="links-bar-container">
                <ul className="links-bar">
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">About</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="https://help.instagram.com/">Help</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="https://about.instagram.com/blog/">Press</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="/developer/">API</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="/about/jobs/">Jobs</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="/legal/privacy/">Privacy</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item _vfM2" href="/legal/terms/">Terms</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="/explore/locations/">Locations</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="/directory/profiles/">Top Accounts</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item" href="/directory/hashtags/">Hashtags</h5></li>
                    <li className="suggestion-link"><h5 className="suggestion-link-item">Language·</h5></li>
                </ul>
            </div>
            <span className="fooetr-heading">© 2021 Geogram from Gil</span>
        </div> 
    </article>
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}

export const SuggestionBarList = connect(mapStateToProps)(_SuggestionBarList);