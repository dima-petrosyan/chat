import dialoguesReducer from './dialoguesReducer.js'
import profileReducer from './profileReducer.js'

let store = {

	_state: {

		dialoguesPage: {

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

			newMessageText: 'smth'
		},

		profilePage: {

			posts: [
				{id: 1, text: 'Hi'},
				{id: 2, text: 'Hello'},
				{id: 3, text: 'What`s up?'},
				{id: 4, text: 'How are you?'},
				{id: 5, text: 'My name is Dima'}
			],

			newPostText: 'smth'
			
		}

	},

	getState() {
		return this._state
	},

	_callSubscriber() {

	},

	subscribe(observer) { // Pattern Observer
		this._callSubscriber = observer
	},

	dispatch(action) {

		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialoguesPage = dialoguesReducer(this._state.dialoguesPage, action);
		this._callSubscriber(this._state);

	}

}

export default store







