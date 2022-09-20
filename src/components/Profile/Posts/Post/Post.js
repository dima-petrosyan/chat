
import React from 'react'
import style from './Post.module.css'

function Post(props) {
	return (
		<div className={style.post}>
			<img src="https://ru-static.z-dn.net/files/ddd/02bd3a23f077cda4cc1843b6467a4db1.jpg" alt="Avatar"/>
			<div className={style.content}>
				<h1>{props.message}</h1>
				<button className={style.button}>Like</button>
			</div>
		</div>
	)
}

export default Post