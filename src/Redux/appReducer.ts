import { auth } from './authReducer'
import { Dispatch } from 'redux'
import { ThunkAction} from 'redux-thunk'
import { AppStateType } from './redux-store'

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

type InitialStateType = {
	initialized: boolean
}

const initialState: InitialStateType = {
	initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
	
	// - copy only what we need to change
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS // 'INITIALIZED-SUCCESS'
}

export const initializedSuccess = (): InitializedSuccessActionType => {
	return {
		type: INITIALIZED_SUCCESS
	}
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, any>

export const initializeApp = () => {
	return (dispatch: any) => {
		const promise = dispatch(auth())
		promise.then(() => {
			dispatch(initializedSuccess())
		})
	}
}

export default appReducer









