
const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {

	dialoguesData: [
		{id: 1, name: 'Dmitry'},
		{id: 2, name: 'Vlad'},
		{id: 3, name: 'Danil'},
		{id: 4, name: 'Alexander'},
		{id: 5, name: 'Amaliya'},
	],

	messagesData: [
		{id: 1, text: 'Hi'},
		{id: 2, text: 'Hello'},
		{id: 3, text: 'What`s up?'},
	],

}

const dialoguesReducer = (state = initialState, action) => {
	
	// - copy only what we need to change
	switch (action.type) {
		case ADD_MESSAGE:
			const newMessage = { id: 1, text: action.newMessageBody }
			return {
				...state,
				messagesData: [...state.messagesData, newMessage]
			}
		default:
			return state
	}
}

export const addMessageActionCreator = (newMessageBody) => {
	return {
		type: ADD_MESSAGE,
		newMessageBody
	}
}

export default dialoguesReducer



