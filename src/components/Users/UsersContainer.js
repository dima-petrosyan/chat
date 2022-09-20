import React from 'react'
import { connect } from 'react-redux'
import Users from './Users.js'
import Preloader from '../common/Preloader.js'
import { WithAuthRedirect } from './../HOC/WithAuthRedirect.js'

// Action Creators
import { followThunk, unfollowThunk, toggleIsFollowingProgress, getUsers, getCurrentPageUsers } from '../../Redux/usersReducer.js'
import { getAllUsersSuperSelector, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../Redux/usersSelectors.js'

class UsersContainerMiddle extends React.Component {

	// constructor(props) {
	// 	super(props)
	// 	object is created only once, constructor is called also only once during one event loop
	// }

	// called after React use .render(), get jsx and create html element, and component added to DOM, only once
	// called every time when we use routing to show component on page
	componentDidMount() {

		// - thunk
		// - redux 
		this.props.getUsers(this.props.currentPage, this.props.pageSize)

		// this.props.toggleIsFetching(true)
		// usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.toggleIsFetching(false)
		// 		this.props.setUsers(data.items)
		// 		this.props.setTotalUsersCount(data.totalCount)
		// 	})
	}

	onPageChanged = (pageNumber) => {

		// - thunk
		this.props.getCurrentPageUsers(pageNumber, this.props.pageSize)

		// this.props.toggleIsFetching(true)
		// this.props.setCurrentPage(pageNumber)
		// usersAPI.getUsers(pageNumber, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.toggleIsFetching(false)
		// 		this.props.setUsers(data.items)
		// 	})
	}

	render() { 
		return (
			<>
				{ this.props.isFetching ? <Preloader /> : <Users 
																totalUsersCount={this.props.totalUsersCount}
																pageSize={this.props.pageSize}
																currentPage={this.props.currentPage}
																onPageChanged={this.onPageChanged}
																users={this.props.users}
																followThunk={this.props.followThunk}
																unfollowThunk={this.props.unfollowThunk}
																followingInProgress={this.props.followingInProgress}
															/>
				}
			</>
		)
	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingInProgress: state.usersPage.followingInProgress
// 	}
// }

const mapStateToProps = (state) => {
	return {
		users: getAllUsersSuperSelector(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

// const mapDispatchToProps = (dispatch) => {

// 	return {

// 		follow: (userId) => {
// 			dispatch(follow(userId))
// 		},

// 		unfollow: (userId) => {
// 			dispatch(unfollow(userId))
// 		},

// 		setUsers: (users) => {
// 			dispatch(setUsers(users))
// 		},

// 		setCurrentPage: (currentPage) => {
// 			dispatch(setCurrentPage(currentPage))
// 		},

// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setTotalUsersCount(totalCount))
// 		},

// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetching(isFetching))
// 		}

// 	}
// }

const mapDispatchObjectToProps = {
	followThunk,
	unfollowThunk,
	toggleIsFollowingProgress,
	getUsers,
	// getUsersThunkCreator
	getCurrentPageUsers // - thunk
}

let withRedirect = WithAuthRedirect(UsersContainerMiddle)

const UsersContainer = connect(mapStateToProps, mapDispatchObjectToProps)(withRedirect); // connect to store

export default UsersContainer;

// UsersContainer(for BLL) -> UsersContainerMiddle(for DAL) -> Users(for UI)















