import { httpService } from './httpService'

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveFavorite
}

window.userService = userService


function getUsers() {
    return httpService.get(`user`)
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    var updatedUser = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === updatedUser._id) _saveLocalUser(updatedUser)
    return updatedUser
}

async function saveFavorite(postId, loggedInUser) {
    const userId = loggedInUser._id
    const user = await getById(userId)

    if (user.favoritePosts.includes(postId)) {
        user.favoritePosts = user.favoritePosts.filter(favoritePost =>
            favoritePost !== postId)
    } else {
        user.favoritePosts.unshift(postId)
    }
    // const savedUser = await update(user)
    // console.log('savedUser', savedUser)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}

async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}


