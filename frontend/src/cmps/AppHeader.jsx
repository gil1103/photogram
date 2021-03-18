import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { loadPosts, filterPosts } from '../store/actions/postActions'
import { PostFilter } from './PostFilter.jsx'

export function AppHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()

    const onSetFilter = (filterBy) => {
        dispatch (filterPosts(filterBy))
        dispatch(loadPosts(filterBy))
    }

    return (
        <section className="header-wrapper">
            <header className="main-header main-container">
                <div className="flex flex-center flex-space-between">
                    <span className="logo flex"> <Link to="/"><h1>photogram</h1></Link></span>
                    <PostFilter onSetFilter={onSetFilter} />
                    <nav className="header-list-container">
                        <div className="header-list flex flex-center ">
                            <div><Link to="/"><img src={require('../assets/img/home.png').default} alt='' /></Link></div>
                            <div><Link to="/msg"><img src={require('../assets/img/msg.png').default} alt='' /></Link></div>
                            <div><Link to="/explore"><img src={require('../assets/img/explore.JPG').default} alt='' /></Link></div>
                            <div><Link to="/profile/liked"><img src={require('../assets/img/like.png').default} alt='' /></Link></div>
                            <div className= { isModalOpen ?"modal-btn-border" : "modal-btn"} onClick={() => setIsModalOpen(!isModalOpen)}>
                                <img className={isModalOpen ? "logo-outer-border" : ''} src={require('../assets/img/profile.JPG').default} alt='' />
                                {isModalOpen && (
                                    <div className="pos-abs">
                                        <div className="modal-diamond"></div>
                                        <div className="modal-container">
                                            <div className="modal">
                                                <div className="modal-icon-txt"><Link to={'/login'} >Login</Link></div>
                                                <div className="flex">
                                                    <div className="modal-icon"><svg aria-label="Profile" fill="#262626" height="16" viewBox="0 0 32 32" width="16">
                                                        <path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path></svg></div>
                                                    <div className="modal-icon-txt"><Link to={'/profile'}>Profile</Link></div>
                                                </div>
                                                <div className="flex">
                                                    <div className="modal-icon"><svg aria-label="Saved" fill="#262626" height="16" viewBox="0 0 32 32" width="16"><path d="M28.7 32c-.4 0-.8-.2-1.1-.4L16 19.9 4.4 31.6c-.4.4-1.1.6-1.6.3-.6-.2-.9-.8-.9-1.4v-29C1.8.7 2.5 0 3.3 0h25.4c.8 0 1.5.7 1.5 1.5v29c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM4.8 3v23.9l9.4-9.4c.9-.9 2.6-.9 3.5 0l9.4 9.4V3H4.8z"></path></svg></div>
                                                    <div className="modal-icon-txt"><Link to={'/profile/saved'}>Saved</Link></div>
                                                </div>
                                            </div>
                                            <div className="log-out">Log Out</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </section>
    )
}
