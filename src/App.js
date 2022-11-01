
import React from 'react'
import './App.css'

import HeaderContainer from './components/Header/HeaderContainer'
import Aside from './components/Aside/Aside'
import UsersContainer from './components/Users/UsersContainer'
import Login from './components/Login/Login'

import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { initializeApp } from './Redux/appReducer'
import { connect } from 'react-redux'
import Preloader from './components/common/Preloader'

import { Suspense } from 'react'

// import DialoguesContainer from './components/Dialogues/DialoguesContainer.js'
// we use lazy loading when we don't need to load page (f.e. DialoguesContainer) when our app start,
// this page will be loaded when we visit it, webpack doesn't put DialoguesContainer in bundle.js which
// loades all files when app start
const DialoguesContainer = React.lazy(() => import('./components/Dialogues/DialoguesContainer'))

// import ProfileContainer from './components/Profile/ProfileContainer.js'
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

	componentDidMount() {
		this.props.initializeApp()
	}

	render() {

		if (!this.props.initialized) {
			return <Preloader />
		} else {

	   		return (
	   			<BrowserRouter>
		      		<div className='app-wrapper'>
		         		<HeaderContainer />
		         		<Aside />
		         		<div className='app-wrapper-content'>
		         			<Suspense fallback={<div><Preloader /></div>}>
			           			<Routes>

					          		{/* /profile/:userId - set parameters */}
									<Route path='/profile' element={<ProfileContainer /> } />       	
									<Route path='/profile/:userId' element={<ProfileContainer /> } />

					         		<Route path='/dialogues/*' element={<DialoguesContainer />} />
					            	<Route path='/users' element={<UsersContainer pageTitle='Samurai' /> } />
					            	<Route path='/login' element={<Login /> } />	            	

			            		</Routes>
			            	</Suspense>
		         		</div>
		      		</div>
	      		</BrowserRouter>
	   		)
	   	}
	}
}

const mapStateToProps = (state) => {
	return {
		initialized: state.app.initialized
	}
}

export default connect(mapStateToProps, { initializeApp })(App);












