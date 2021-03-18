import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import { postReducer } from './reducers/postReducer'
import { userReducer } from './reducers/userReducer'
import { systemReducer } from './reducers/systemReducer'


const rootReducer = combineReducers({
    systemModule: systemReducer,
    postModule: postReducer,
    userModule: userReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
