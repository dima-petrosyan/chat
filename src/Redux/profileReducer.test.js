
import React from 'react'
import profileReducer, {addPostActionCreator, deletePostActionCreator} from './profileReducer.js'

let state = {
	posts: [
		{id: 1, text: 'Hi'},
		{id: 2, text: 'Hello'},
		{id: 3, text: 'What`s up?'},
		{id: 4, text: 'How are you?'},
		{id: 5, text: 'My name is Dima'}
	]
}

test('Length of posts should be incremented', () => {

	// 1. Start test data
	const action = addPostActionCreator('New post text')

	// 2. Action
	const newState = profileReducer(state, action)

	// 3. Expectation
	expect(newState.posts.length).toBe(6)

});

test('Text of new post should be correct', () => {

	// 1. Start test data
	const action = addPostActionCreator('New post text')

	// 2. Action
	const newState = profileReducer(state, action)

	// 3. Expectation
	expect(newState.posts[0].text).toBe('New post text')

});

test('After deleting length of posts should be decrement', () => {

	// 1. Start test data
	const action = deletePostActionCreator(1) // id = 1

	// 2. Action
	const newState = profileReducer(state, action)

	// 3. Expectation
	expect(newState.posts.length).toBe(4)

});

test('After deleting length of posts shouldn`t be changed, if Id is incorrect', () => {

	// 1. Start test data
	const action = deletePostActionCreator(21) // id = 1

	// 2. Action
	const newState = profileReducer(state, action)

	// 3. Expectation
	expect(newState.posts.length).toBe(5)

});




