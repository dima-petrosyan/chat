
import React from 'react'
import style from './Aside.module.css'

import { NavLink } from 'react-router-dom'

function Aside() {
	return (
		<aside className={style.aside}>
			<ul className={style.menu}>
				<li className={style.item}>
					<NavLink to="/profile" className={link => link.isActive ? style.active : null}>Profile</NavLink>
				</li>
				<li className={style.item}>
					<NavLink to="/dialogues" className={link => link.isActive ? style.active : null}>Dialogues</NavLink>
				</li>
				<li className={style.item}>
					<a href="/news">News</a>
				</li>
				<li className={style.item}>
					<a href="/music">Music</a>
				</li>
				<li className={style.item}>
					<a href="/settings">Settings</a>
				</li>
				<li className={style.item}>
					<NavLink to="/users" className={link => link.isActive ? style.active : null}>Users</NavLink>
				</li>
			</ul>
		</aside>
	)
}

export default Aside