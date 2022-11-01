
import React from 'react'
import style from './Posts.module.css'

import Post from './Post/Post'
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../utilites/validators/validators'
import Textarea from '../../common/FormControls/FormControls'

// class Posts extends React.PureComponent {

// 	// don't used anymore, PureComponent makes it automatically
// 	// shouldComponentUpdate(nextProps, nextState) {
// 	// 	return nextProps != this.props || nextState != this.state
// 	// }

// 	render() {
// 		console.log('render')

// 		const posts = this.props.posts.map((post) => {
// 			return <Post key={post.id} message={post.text}/>
// 		})

// 		const onAddPost = (data) => {
// 			this.props.addPost(data.newPostBody);
// 		}

// 		return (
// 			<div>
// 				<div className={style.addPost}>
// 					<h1>Posts</h1>
// 					<AddPostFormRedux onSubmit={onAddPost} />
// 				</div>
// 				<div className={style.posts}>
// 					{posts}
// 				</div>
// 			</div>
// 		)
// 	}
// }


// React.memo is a HOC that works like PureComponent
const Posts = React.memo((props) => {

	const posts = props.posts.map((post) => {
		return <Post key={post.id} message={post.text}/>
	})

	const onAddPost = (data) => {
		props.addPost(data.newPostBody);
	}

	console.log('render')

	return (
		<div>
			<div className={style.addPost}>
				<h1>Posts</h1>
				<AddPostFormRedux onSubmit={onAddPost} />
			</div>
			<div className={style.posts}>
				{posts}
			</div>
		</div>
	)
})

const maxLength10 = maxLengthCreator(10);

function AddPostForm(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field component={Textarea} name={'newPostBody'} placeholder={'Enter your post'} 
				   validate={[required, maxLength10]} />
			<button>Add post</button>
		</form>
	)
}

const AddPostFormRedux = reduxForm({
	form: 'postAddPostForm'
})(AddPostForm)

export default Posts










