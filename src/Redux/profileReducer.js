import { profileAPI } from './../components/API/API.js'
import { stopSubmit } from 'redux-form'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'

let initialState = {

	posts: [
		{id: 1, text: 'Hi'},
		{id: 2, text: 'Hello'},
		{id: 3, text: 'What`s up?'},
		{id: 4, text: 'How are you?'},
		{id: 5, text: 'My name is Dima'}
	],

	profile: null,
	status: ''
			
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = { id: 1, text: action.newPostBody }
			return {
				...state,
				posts: [ newPost, ...state.posts],
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			};
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status
			};
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(post => post.id != action.postId)
			}
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {
					...state.profile,
					photos: action.photos
				}
			}
		}
		default: 
			return state;
	}
}

export const addPostActionCreator = (newPostBody) => {
	return {
		type: ADD_POST,
		newPostBody
	}
}

export const setUserProfile = (profile) => {
	return {
		type: SET_USER_PROFILE,
		profile
	}
}

export const setStatus = (status) => {
	return {
		type: SET_STATUS,
		status
	}
}

export const savePhotoSuccess = (photos) => {
	return {
		type: SAVE_PHOTO_SUCCESS,
		photos
	}
}

// - thunk
export const getProfile = (userId) => {
	return (dispatch) => {
		profileAPI.getProfile(userId).then(data => {
			dispatch(setUserProfile(data))
		})
	}
}

export const getStatus = (userId) => {
	return (dispatch) => {
		profileAPI.getStatus(userId).then(data => {
			dispatch(setStatus(data))
		})
	}
}

export const updateStatus = (status) => {
	return (dispatch) => {
		profileAPI.updateStatus(status).then(data => {
			if (data.resultCode === 0) {
				dispatch(setStatus(status))
			}
		})
	}
}

export const savePhoto = (file) => {
	return (dispatch) => {
		profileAPI.savePhoto(file).then(data => {
			if (data.resultCode === 0) {
				dispatch(savePhotoSuccess(data.photos))
			}
		})
	}
}

export const saveProfile = (profile) => {
	return (dispatch, getState) => {
		const userId = getState().auth.userId
		profileAPI.saveProfile(profile).then(data => {
			if (data.resultCode === 0) {
				dispatch(getProfile(userId))
			} else {
				const message = data.messages.length > 0 ? data.messages[0] : 'Some error'
				dispatch(stopSubmit('editProfile', {_error: message}))
				return Promise.reject(message)
			}
		})
	}
}

export const deletePostActionCreator = (postId) => {
	return {
		type: DELETE_POST,
		postId
	}
}

export default profileReducer;














