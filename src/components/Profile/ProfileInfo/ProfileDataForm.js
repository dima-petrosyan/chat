import React from 'react'
import { createField, Input, Textarea } from './../../common/FormControls/FormControls'
import { reduxForm } from 'redux-form'
import style from './ProfileDataForm.module.css'

const ProfileDataForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<button>Save</button>
			{
				props.error && <div className={style.summaryError}>{props.error}</div>
			}
			<div>
				<b>Full name</b>: { createField('Full name', 'fullName', [], Input) }
			</div>
			<div>
				<b>Looking for a job</b>: { createField('', 'lookingForAJob', [], Input, {type: 'checkbox'}) }
			</div>
			<div>
				<b>My professional skills</b>: { createField('My professional skills', 'lookingForAJobDescription', [], Textarea) }
			</div>
			<div>
				<b>About me</b>: { createField('About me', 'aboutMe', [], Textarea) }
			</div>
			<div>
				<b>Contacts</b>: 
				{ 
					Object.entries(props.profile.contacts).map(([key, value]) => {
						return (
							<div key={key} style={{paddingLeft: '10px'}}>
								<b>{key}: { createField(key, `contacts.${key}`, [], Input) }</b>
							</div>
						)
					})
				}
			</div>
		</form>
	)
}

const ProfileDataReduxForm = reduxForm({
	form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataReduxForm


