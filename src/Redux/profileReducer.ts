import { profileAPI } from './../components/API/API'
import { stopSubmit } from 'redux-form'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'
import { Dispatch } from 'redux'
import { PostType, ContactsType, PhotosType, ProfileType } from '../types/types'

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
	] as Array<PostType>,

	profile: null as ProfileType | null,
	status: ''
			
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: Action): InitialStateType => {
	switch (action.type) {
		case ADD_POST: {
			const newPost = { id: 1, text: action.newPostBody }
			return {
				...state,
				posts: [ newPost, ...state.posts],
			}
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			}
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status
			}
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
				} as ProfileType
			}
		}
		default: 
			return state
	}
}

type Action = 
	| { type: typeof ADD_POST, newPostBody: string }
	| { type: typeof SET_USER_PROFILE, profile: ProfileType }
	| { type: typeof SET_STATUS, status: string }
	| { type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType }
	| { type: typeof DELETE_POST, postId: number }

export const addPostActionCreator = (newPostBody: string): Action => {
	return {
		type: ADD_POST,
		newPostBody
	}
}

export const setUserProfile = (profile: ProfileType): Action => {
	return {
		type: SET_USER_PROFILE,
		profile
	}
}

export const setStatus = (status: string): Action => {
	return {
		type: SET_STATUS,
		status
	}
}

export const savePhotoSuccess = (photos: PhotosType): Action => {
	return {
		type: SAVE_PHOTO_SUCCESS,
		photos
	}
}

type ThunkType = ThunkAction<void, AppStateType, unknown, Action>

// - thunk
export const getProfile = (userId: number | null): ThunkType => {
	return (dispatch: Dispatch<Action>) => {
		profileAPI.getProfile(userId).then((data: any) => {
			dispatch(setUserProfile(data))
		})
	}
}

export const getStatus = (userId: number): ThunkType => {
	return (dispatch: Dispatch<Action>) => {
		profileAPI.getStatus(userId).then((data: any) => {
			dispatch(setStatus(data))
		})
	}
}

export const updateStatus = (status: string): ThunkType => {
	return (dispatch: Dispatch<Action>) => {
		profileAPI.updateStatus(status).then((data: any) => {
			if (data.resultCode === 0) {
				dispatch(setStatus(status))
			}
		})
	}
}

export const savePhoto = (file: any): ThunkType => {
	return (dispatch: Dispatch<Action>) => {
		profileAPI.savePhoto(file).then((data: any) => {
			if (data.resultCode === 0) {
				dispatch(savePhotoSuccess(data.photos))
			}
		})
	}
}

export const saveProfile = (profile: ProfileType): ThunkType => {
	return (dispatch: any, getState: () => AppStateType) => {
		const userId = getState().auth.userId
		profileAPI.saveProfile(profile).then((data: any) => {
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

export const deletePostActionCreator = (postId: number): Action => {
	return {
		type: DELETE_POST,
		postId
	}
}

export default profileReducer














