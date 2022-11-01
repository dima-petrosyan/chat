
const ADD_MESSAGE = 'ADD-MESSAGE'

type DialogueType = {
	id: number,
	name: string
}

type MessageType = {
	id: number,
	text: string
}

let initialState = {

	dialoguesData: [
		{id: 1, name: 'Dmitry'},
		{id: 2, name: 'Vlad'},
		{id: 3, name: 'Danil'},
		{id: 4, name: 'Alex'},
		{id: 5, name: 'Denis'},
	] as Array<DialogueType>,

	messagesData: [
		{id: 1, text: 'Hi'},
		{id: 2, text: 'Hello'},
		{id: 3, text: 'What`s up?'},
	] as Array<MessageType>,

}

type InitialStateType = typeof initialState

const dialoguesReducer = (state = initialState, action: any): InitialStateType => {
	
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

type AddMessageActionType = {
	type: typeof ADD_MESSAGE,
	newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): AddMessageActionType => {
	return {
		type: ADD_MESSAGE,
		newMessageBody
	}
}

export default dialoguesReducer



