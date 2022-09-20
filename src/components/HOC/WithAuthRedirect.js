import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToPropsForRedirect = (state) => ({
	isAuth: state.auth.isAuth // for redirect
})

// - HOC(get component and return container component)
// - HOC for redirect
export const WithAuthRedirect = (Component) => {
	
	function RedirectComponent(props) {
		if (!props.isAuth) {
			return <Navigate to='/login' />
		}
		return <Component {...props} />
	}

	const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

	return ConnectedAuthRedirectComponent
}