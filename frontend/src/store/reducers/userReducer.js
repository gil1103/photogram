let localLoggedinUser = null
if (sessionStorage.loggedinUser) localLoggedinUser = JSON.parse(sessionStorage.loggedinUser)

const initialState = {
    users: [],
    loggedInUser: localLoggedinUser
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedInUser: action.user }
        case 'SET_USERS':
            console.log('localLoggedinUser',localLoggedinUser);
            return { ...state, users: action.users }
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        case 'SAVE_FAVORITE':
            return {...state, users: state.users.map((user) => {
                    if (user._id === action.user._id) {
                        return action.user
                    }
                    else return user
                })
            }
        case 'SIGNUP':
            return { ...state, user: [...state.users, action.user], loggedInUser: action.user }
        default:
            return state
    }
}
