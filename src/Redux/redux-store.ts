
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import profileReducer from './profileReducer'
import dialoguesReducer from './dialoguesReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialoguesPage: dialoguesReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
})

type RootReducerType = typeof rootReducer // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType> // get type of returning value, type of state

// when we dispatch action, it goes to thunkmiddleware that understands its not a thunk and
// puts it into reducer
// when we dispatch thunk, it goes to thunkmiddleware that starts it, the result of thunk is
// dispatch(action) that we again dispatch, goes to thunkmiddleware and puts actions to reducer

// redux devtools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// - thunkMiddleware is a middle layer between reducers and store.dispatch
// - thunk middleware allow to dispatch thunks(functions) that returns actions and then disptach them to reducers
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store 

export default store