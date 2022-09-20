
import React from 'react'
import Dialogues from './Dialogues.js'
import { addMessageActionCreator } from '../../../src/Redux/dialoguesReducer.js'
import { connect } from 'react-redux'
import { WithAuthRedirect } from './../HOC/WithAuthRedirect.js'
import { compose } from 'redux'

// import { StoreContext } from './../../index.js'

// function DialoguesContainer(props) {
 
// 	return (
// 		<StoreContext.Consumer>
// 		{
// 			(store) => {

// 				const state = store.getState().dialoguesPage;

// 				function handleChange(text) {
// 					store.dispatch(updateNewMessageTextActionCreator(text))
// 				}

// 				function onMessageSend() {
// 					store.dispatch(addMessageActionCreator())
// 				}
				
// 				return <Dialogues dialoguesPage={state} sendMessage={onMessageSend} updateNewMessageText={handleChange}/>

// 			}
// 		}
// 		</StoreContext.Consumer>
// 	)
// }

// func 'connect' give state from store here
const mapStateToProps = (state) => {
	return {
		dialoguesPage: state.dialoguesPage,
	}
}

// func 'connect' give store.dispatch.bind(store) from store here
const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (newMessageBody) => {
			dispatch(addMessageActionCreator(newMessageBody))
		}
	}
}

// const AuthRedirectComponent = WithAuthRedirect(Dialogues)

// const DialoguesContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
// - create container component which connect presentational component to store
// - 'connect' choose components that should be rerendered and rerender them effectively because 'connect' has its own subscribe
// - every time when store is changed, 'connect' compare new obj from mapStateToProps with previous obj from state
// - we use connect instead of context

// - compose
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	WithAuthRedirect
)(Dialogues)
















