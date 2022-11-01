import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'
import { Dispatch } from 'redux'
import { authAPI, securityAPI } from './../components/API/API.js'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: Action): InitialStateType => {
	
	// - copy only what we need to change
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
			}
		case GET_CAPTCHA_URL_SUCCESS: 
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
}

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA,
	data: {
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	}
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
	return {
		type: SET_USER_DATA,
		data: { // data or payload
			userId,
			email,
			login,
			isAuth
		}
	}
}

type GetCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS,
	payload: {
		captchaUrl: string
	}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
	return {
		type: GET_CAPTCHA_URL_SUCCESS,
		payload: {
			captchaUrl
		}
	}
}

type Action = GetCaptchaUrlSuccessActionType | SetAuthUserDataActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, any>

// - thunk
export const auth = (): ThunkAction<void, AppStateType, unknown, Action> => {
	return (dispatch: Dispatch<Action>) => {
		return authAPI.auth().then((data: any) => {
			if (data.resultCode === 0) { // - authorized
				const { id, email, login } = data.data
				dispatch(setAuthUserData(id, email, login, true))
			} 
		})
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
	return async (dispatch: Dispatch<any>) => {
		const data = await authAPI.login(email, password, rememberMe, captcha)
		if (data.resultCode === 0) { // - authorized
			dispatch(auth())
		} else {
			if (data.resultCode === 10) {
				dispatch(getCaptchaUrl())
			}
			const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
			const action = stopSubmit('login', {_error: message})
			dispatch(action)
		}
	}
}

export const getCaptchaUrl = () => {
	return async (dispatch: any) => {
		const data = await securityAPI.getCaptchaUrl()
		const captchaUrl = data.url
		dispatch(getCaptchaUrlSuccess(captchaUrl))
	}
}

export const logout = (): ThunkAction<void, AppStateType, unknown, Action> => {
	return (dispatch: Dispatch<Action>) => {
		authAPI.logout().then((data: any) => {
			if (data.resultCode === 0) { // - authorized
				dispatch(setAuthUserData(null, null, null, false))
			}
		})
	}
}

export default authReducer









