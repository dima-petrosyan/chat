
import { authAPI, securityAPI } from './../components/API/API.js'
import { stopSubmit } from 'redux-form'

const SET_USER_DATA = 'SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET-CAPTCHA-URL-SUCCESS'

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null
}

const authReducer = (state = initialState, action) => {
	
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

export const setAuthUserData = (userId, email, login, isAuth) => {
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

export const getCaptchaUrlSuccess = (captchaUrl) => {
	return {
		type: GET_CAPTCHA_URL_SUCCESS,
		payload: {
			captchaUrl
		}
	}
}

// - thunk
export const auth = () => {
	return (dispatch) => {
		return authAPI.auth().then(data => {
			if (data.resultCode === 0) { // - authorized
				const { id, email, login } = data.data
				dispatch(setAuthUserData(id, email, login, true))
			} 
		})
	}
}

export const login = (email, password, rememberMe, captcha) => {
	return async (dispatch) => {
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
	return async (dispatch) => {
		const data = await securityAPI.getCaptchaUrl()
		const captchaUrl = data.url
		dispatch(getCaptchaUrlSuccess(captchaUrl))
	}
}

export const logout = () => {
	return (dispatch) => {
		authAPI.logout().then(data => {
			if (data.resultCode === 0) { // - authorized
				dispatch(setAuthUserData(null, null, null, false))
			}
		})
	}
}

export default authReducer;









