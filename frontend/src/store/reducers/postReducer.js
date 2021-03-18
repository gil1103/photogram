
const initialState = {
  posts: [],
  isCommentFocus : false,
  filterBy: {
    title: '',
    byUser: ''
  }
}

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.posts, filterBy: action.filterBy }
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.post] }
    case 'SAVE_POST':
      return {
        ...state, posts: state.posts.map(post => {
          if (post._id === action.post._id) {
            console.log('post._id:',post._id, 'action.post._id:',action.post._id);
            return action.post
          }
          else return post
        })
      }
    case 'REMOVE_POST':
      return { ...state, posts: state.posts.filter(post => post._id !== action.postId) }
    case 'FOCUS_COMMENT':
      return {...state, isCommentFocus:!state.isCommentFocus}  
    case 'FILTER_POSTS':
      return { ...state, filterBy: action.filterBy }
    default:
      return state
  }
}

