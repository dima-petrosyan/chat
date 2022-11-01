import React from 'react'
import Profile from './Profile'
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../Redux/profileReducer'
import { connect } from 'react-redux'
import { WithAuthRedirect } from './../HOC/WithAuthRedirect'
import { compose } from 'redux'

// - Old decision
// import { withRouter } from 'react-router-dom'

// - Modern decision
import { useLocation, useNavigate, useParams } from 'react-router-dom'

class ProfileContainer extends React.Component {
	
	refreshProfile() {

		let userId = this.props.router.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId
			if (!userId) {
				this.props.history.push('/login')
			}
		}

		// - thunk
		this.props.getProfile(userId)
		this.props.getStatus(userId)

		// profileAPI.getProfile(userId).then(data => {
		// 	this.props.setUserProfile(data)
		// })

	}

	componentDidMount() {
		this.refreshProfile()
	}

	// for refreshing profile on clicking 
	// calls every time when props or state are changed
	componentDidUpdate(prevProps, prevState) {
		if (this.props.router.params.userId != prevProps.router.params.userId) {
			this.refreshProfile()
		}
	}

	render() {
		return (
			<Profile {...this.props} savePhoto={this.props.savePhoto} isOwner={!this.props.router.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
		)
	}
}

// let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)

// - HOC
function withRouter(Component) {

	function ComponentWithRouterProps(props) {

		let location = useLocation()
		let navigate = useNavigate()
		let params = useParams()

		return (
			<Component {...props} router={{location, navigate, params}} />
		)
	}

	return ComponentWithRouterProps

}

// const WithUrlDataContainerComponent = withRouter(ProfileContainer)
// 'withRouter' return component ProfileContainer which 'withRouter' put data from url in
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
})

// export default connect(mapStateToProps, {getProfile})(WithUrlDataContainerComponent)
// 'connect' return HOC on ProfileContainer which 'connect' put data from store in

export default compose(
	WithAuthRedirect,
	withRouter,
	connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile})
)(ProfileContainer)









