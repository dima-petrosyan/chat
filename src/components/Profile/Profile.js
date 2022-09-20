
import React from 'react'
import style from './Profile.module.css'

import ProfileInfo from './ProfileInfo/ProfileInfo.js'
import PostsContainer from './Posts/PostsContainer.js'

function Profile(props) {
	return (
		<main>
			<section className={style.profile}>
				<ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
				<PostsContainer />
			</section>
		</main>
	)
}

export default Profile