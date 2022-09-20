import { auth } from './authReducer.js'

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

let initialState = {
	initialized: false
}

const appReducer = (state = initialState, action) => {
	
	// - copy only what we need to change
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}
		default:
			return state;
	}
}

export const initializedSuccess = () => {
	return {
		type: INITIALIZED_SUCCESS
	}
}

export const initializeApp = () => {
	return (dispatch) => {
		const promise = dispatch(auth())
		promise.then(() => {
			dispatch(initializedSuccess())
		})
	}
}

export default appReducer;









