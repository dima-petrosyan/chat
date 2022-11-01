
import React from 'react'
import Posts from './Posts'
import { addPostActionCreator } from '../../../../src/Redux/profileReducer'

import { connect } from 'react-redux'

// import { StoreContext } from './../../../index.js'

// function PostsContainer(props) {

// 	return (
// 		<StoreContext.Consumer>
// 		{
// 			(store) => {
// 				const state = store.getState();
// 				const addPost = () => {
// 					store.dispatch(addPostActionCreator())
// 				}

// 				const handleChange = (text) => {
// 					let action = updateNewPostTextActionCreator(text);
// 					store.dispatch(action);
// 				}

 			// 	return (
 			// 		<Posts posts={state.profilePage.posts} 
				// 		newPostText={state.profilePage.newPostText} 
				// 		addPost={addPost} 
				// 		updateNewPostText={handleChange}/>
				// )
// 			}
// 		}
// 		</StoreContext.Consumer>
// 	)
// }

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: (newPostBody) => {
			dispatch(addPostActionCreator(newPostBody))
		}
	}
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts)

export default PostsContainer






