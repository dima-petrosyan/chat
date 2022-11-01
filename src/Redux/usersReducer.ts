
import { usersAPI, followAPI } from './../components/API/API'
import { UserType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'
import { Dispatch } from 'redux'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'

const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {

	users: [] as Array<UserType>,
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number> // array of users' id whose buttons are disabled
			
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: Action): InitialStateType => {
	switch (action.type) {
		case FOLLOW: 
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return {
							...user,
							followed: true
						}
					}
					return user
				})
			}
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return {
							...user,
							followed: false
						}
					}
					return user
				})
			}
		case SET_USERS: 
			return {
				...state,
				users: action.users
			}
		case SET_CURRENT_PAGE: 
			return {
				...state,
				currentPage: action.currentPage
			}
		case SET_TOTAL_USERS_COUNT: 
			return {
				...state,
				totalUsersCount: action.totalUsersCount
			}
		case TOGGLE_IS_FETCHING: 
			return {
				...state,
				isFetching: action.isFetching
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS: 
			return {
				...state,
				followingInProgress: action.followingInProgress ? 
					[...state.followingInProgress, action.userId] : 
					state.followingInProgress.filter(id => id !== action.userId)
			}
		default: 
			return state;
	}
}

type Action = 
	| { type: typeof FOLLOW | typeof UNFOLLOW, userId: number }
	| { type: typeof SET_USERS, users: Array<UserType> }
	| { type: typeof SET_CURRENT_PAGE, currentPage: number }
	| { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number }
	| { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
	| { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress: boolean, userId: number }

export const follow = (userId: number): Action => {
	return {
		type: FOLLOW,
		userId
	}
}

export const unfollow = (userId: number): Action => {
	return {
		type: UNFOLLOW,
		userId
	}
}

export const setUsers = (users: Array<UserType>): Action => {
	return {
		type: SET_USERS,
		users
	}
}

export const setCurrentPage = (currentPage: number): Action => {
	return {
		type: SET_CURRENT_PAGE,
		currentPage
	}
}

export const setTotalUsersCount = (totalUsersCount: number): Action => {
	return {
		type: SET_TOTAL_USERS_COUNT,
		totalUsersCount
	}
}

export const toggleIsFetching = (isFetching: boolean): Action => {
	return {
		type: TOGGLE_IS_FETCHING,
		isFetching
	}
}

export const toggleIsFollowingProgress = (followingInProgress: boolean, userId: number): Action => {
	return {
		type: TOGGLE_IS_FOLLOWING_PROGRESS,
		followingInProgress,
		userId
	}
}

type ThunkType = ThunkAction<void, AppStateType, unknown, Action>

// - closure is a function that returns another function and has access to outside params

// - thunk is a couple of opearions, that is done like one instance, one proccess
// - thunk is also can be dispatched, but store don't put it into reducers because its a function, store puts the result of thunk
// - redux/store start thunk functions and put dispatch there

// - thunk is a function that do async operations, have dispatch and use it to dispatch simple actions after async operations if it exists
// - thunkcreator is a function that can have some props and return a thunk
// - thunkcreator returns function that we can dispatch
export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
 	
 	return (dispatch: Dispatch<Action>) => {

		dispatch(toggleIsFetching(true))

		// - make async operations
		usersAPI.getUsers(currentPage, pageSize).then((data: any) => {
			// - dispatch simple actions
			dispatch(toggleIsFetching(false))
			dispatch(setUsers(data.items))
			dispatch(setTotalUsersCount(data.totalCount))
		})
	
	}
}

export const getCurrentPageUsers = (pageNumber: number, pageSize: number): ThunkType => {
 	
 	return (dispatch: Dispatch<Action>) => {

 		dispatch(toggleIsFetching(true))
		dispatch(setCurrentPage(pageNumber))

		usersAPI.getUsers(pageNumber, pageSize).then((data: any) => {
			dispatch(toggleIsFetching(false))
			dispatch(setUsers(data.items))
		})
	
	}
}

export const followThunk = (userId: number): ThunkType => {

	return (dispatch: Dispatch<Action>) => {

		dispatch(toggleIsFollowingProgress(true, userId))
													
		followAPI.follow(userId).then((data: any) => {
			if (data.resultCode === 0) { // - subscribe was successful
				dispatch(follow(userId))
			}	
			dispatch(toggleIsFollowingProgress(false, userId))
		})
	}
}

export const unfollowThunk = (userId: number): ThunkType => {

	return (dispatch: Dispatch<Action>) => {

		dispatch(toggleIsFollowingProgress(true, userId))
													
		followAPI.unfollow(userId).then((data: any) => {
			if (data.resultCode === 0) { // - subscribe was successful
				dispatch(unfollow(userId))
			}	
			dispatch(toggleIsFollowingProgress(false, userId))
		})
	}
}

export default usersReducer










