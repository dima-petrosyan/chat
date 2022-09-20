import React from 'react'
import { useState } from 'react'
import Preloader from '../../common/Preloader.js'
import ProfileStatusWithHooks from './ProfileStatusWithHooks.js'
import ProfileDataForm from './ProfileDataForm.js'

function ProfileInfo(props) {

	const [editMode, setEditMode] = useState(false)

	if (!props.profile) {
		return <Preloader />
	}

	function handlePhotoSelected(event) {
		if (event.target.files.length) {
			props.savePhoto(event.target.files[0])
		}
	}

	const onSubmit = (formData) => {
		// props.saveProfile(formData).then(() => {
		// 	setEditMode(false)
		// })
		props.saveProfile(formData)
		setEditMode(false)
	}
 
	return (
		<div>
			<div style={ {height: '150px', width: '150px'} }>
				<img src=
				{
					!props.profile.photos.large ? 
						"https://ru-static.z-dn.net/files/ddd/02bd3a23f077cda4cc1843b6467a4db1.jpg" : props.profile.photos.large
				} alt="Avatar" />
			</div>

			{
				props.isOwner && <input type={'file'} onChange={handlePhotoSelected} />
			}

			{
				editMode ? <ProfileDataForm profile={props.profile} initialValues={props.profile} onSubmit={onSubmit} /> : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => { setEditMode(true) }} />
			}

			<div>
				<b>Status: </b>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
			</div>

		</div>
	)
}

const ProfileData = (props) => {
	return (
		<div>
			{ props.isOwner && <button onClick={props.goToEditMode}>Edit</button> }
			<div>
				<b>Full name</b>: { props.profile.fullName }
			</div>
			<div>
				<b>Looking for a job</b>: { props.profile.lookingForAJob ? 'yes' : 'no' }
			</div>
			{
				props.profile.lookingForAJob && 
				<div>
					<b>My skills</b>: { props.profile.lookingForAJobDescription }
				</div>
			}
			<div>
				<b>About me</b>: { props.profile.aboutMe }
			</div>
			<div>
				<b>Contacts</b>: { Object.entries(props.profile.contacts).map(([key, value]) => <Contact key={key} contactTitle={key} contactValue={value} />) }
			</div>
		</div>
	)
}

const Contact = ({contactTitle, contactValue}) => {
	return (
		<div style={{paddingLeft: '10px'}}>
			<b>{contactTitle}: </b> {contactValue}
		</div>
	)
}

export default ProfileInfo





