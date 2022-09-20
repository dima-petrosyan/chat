import React from 'react'
import Header from './Header.js'
import { connect } from 'react-redux'
import { auth } from './../../Redux/authReducer.js'
import { logout } from './../../Redux/authReducer.js' 

class HeaderContainer extends React.Component {

	componentDidMount() {

		// - thunk
		//this.props.auth()

		// authAPI.auth()
		// 	.then(data => {
		// 		if (data.resultCode === 0) { // - authorized
		// 			const { id, email, login } = data.data
		// 			this.props.setAuthUserData(id, email, login)
		// 		} else if (data.resultCode === 1) { // - unauthorized
		// 			this.props.setAuthUserData('1', 'email.com', 'bedolaga')
		// 		}
		// 	})
	}

	render() {
		return (
			<Header {...this.props} />
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
})

export default connect(mapStateToProps, {logout})(HeaderContainer)















