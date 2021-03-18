import { userService } from '../../service/userService'

export function login(userCreds) {
    return async dispatch => {
        try {
            const user = await userService.login(userCreds)
            dispatch({ type: 'SET_USER', user })
            return user

        } catch (err) {
            console.log('UserActions: err in login', err)
        }
    }
}

export function logout() {
    return async dispatch => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('UserActions: err in logout', err)
        }
    }
}

export function signup(userCreds) {
    return async dispatch => {
        try {
            const user = await userService.signup(userCreds)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in signup', err)
        }
    }
}

export function loadUser() { 
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const user = await userService.getUser()
            dispatch({ type: 'SET_USERS', user })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function loadUsers() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}


export function toggleSave(postId, loggedInUser) {
    return async (dispatch) => {
        const user = await userService.saveFavorite(postId, loggedInUser)
        const action = {
            type: 'SAVE_FAVORITE',
            user
        }
        dispatch(action)
    }
}