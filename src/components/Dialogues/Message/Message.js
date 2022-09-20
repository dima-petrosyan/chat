
import React from 'react'
import style from './Message.module.css'

function Message(props) {
	return (
		<div>
			<h1 className={style.text}>{props.text}</h1>
		</div>
	)
}

export default Message