
import React from 'react'
import style from './DialogueItem.module.css'

import { NavLink } from 'react-router-dom'

function DialogueItem(props) {
	return (
		<li>
			<NavLink to={`/dialogues/${props.id}`}>{props.name}</NavLink>
		</li>
	)
}

export default DialogueItem