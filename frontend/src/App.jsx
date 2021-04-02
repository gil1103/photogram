import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { GeogramApp } from './pages/GeogramApp.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { PostEdit } from './cmps/PostEdit.jsx'
import { PostDetails } from './cmps/PostDetails.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import '../src/assets/styles/styles.scss'

export class App extends Component {

  render() {
    return (
      <>
        <AppHeader />
        <main className="main-container main-container-main">
          <Switch>
            <Route component={PostEdit} path="/post/add" />
            <Route component={PostEdit} path="/post/edit/:postId?" />
            <Route component={PostDetails} path="/post/:postId" />
            <Route component={UserDetails} path="/profile/liked" />
            <Route component={UserDetails} path="/profile/saved" />
            <Route component={UserDetails} path="/profile" />
            <Route component={Signup} path="/signup" />
            <Route component={Login} path="/login"/>
            <Route component={GeogramApp} path="/"/>
          </Switch>
        </main>
      </>
    )
  }
}

