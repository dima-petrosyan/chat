
import React from 'react'
import style from './Header.module.css'
import { NavLink } from 'react-router-dom'

function Header({isAuth, login, logout}) {
	return (
		<header className={style.header}>
			<img src="https://i.pinimg.com/originals/6e/b3/c2/6eb3c208be21b69303b2a1c621e1818e.png" alt="Logo"/>
			<div className={style.login}>
			{
				isAuth ? 
					<div> 
						{login} 
						<button onClick={logout} style={{marginLeft: '10px'}}>Log out</button>
					</div> : 
					<NavLink to={'/login'}>Login</NavLink>
			}
			</div>
		</header>
	)
}

export default Header