
import React from 'react'
import style from './Dialogues.module.css'

import DialogueItem from './DialogueItem/DialogueItem'
import Message from './Message/Message'

import { Field, reduxForm } from 'redux-form'
import Textarea from '../common/FormControls/FormControls'
import { required, maxLengthCreator } from '../../utilites/validators/validators'

function Dialogues(props) {

	const state = props.dialoguesPage;

	const dialogues = state.dialoguesData.map((data) => {
		return <DialogueItem key={data.id} id={data.id} name={data.name} />
	})

	const messages = state.messagesData.map((data) => {
		return <Message key={data.id} text={data.text}/>
	})
	
	function addNewMessage(data) {
		props.sendMessage(data.newMessageBody)
	}
 
	return (
		<div className={style.dialogues}>
			<ul className={style.dialogueItems}>
				{dialogues}
			</ul>
			<div>
				<div className={style.messagesWrapper}>
					<div className={style.messages}>
						{messages}
					</div>
				</div>
				<AddMessageFormRedux onSubmit={addNewMessage} />
			</div>
		</div>
	)
}

const maxLength100 = maxLengthCreator(100)

function AddMessageForm(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'}
			       validate={[required, maxLength100]} />
			<button>Add message</button>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({
	form: 'dialogueAddMessageForm'
})(AddMessageForm)


export default Dialogues




