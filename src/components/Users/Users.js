import React from 'react'
import style from './Users.module.css'
import { NavLink } from 'react-router-dom'

function Users(props) {

	const photoUrl = 'https://best-fly.ru/wp-content/uploads/2020/08/ikonka-malchik.jpg'

	const pageCount = Math.ceil(props.totalUsersCount / props.pageSize)
		
	const pages = []
	for (let i = 1; i <= pageCount; i++) {
		pages.push(i)
	}

	// - carousel array
	let curP = props.currentPage
	let curPF = ((curP - 5) < 0) ? 0 : curP - 5 
	let curPL = curP + 5
	let slicedPages = pages.slice(curPF, curPL)

	return (
		<div>
			<div className={style.pages}>
				{
					slicedPages.map(pageNumber => {
						return (
							<span key={pageNumber} onClick={ (event) => { props.onPageChanged(pageNumber) } } 
								  className={props.currentPage === pageNumber && style.selectedPage}>

									{pageNumber}

							</span>
						)
					})
				}
			</div>
			{
				props.users.map(user => {
					return (
						<div key={user.id} className={style.userItem}>
							<div>
								<NavLink to={`/profile/${user.id}`}>
									<img src={user.photos.small !== null ? user.photos.small : photoUrl} alt="UserPhoto" />
								</NavLink>
							</div>
							<div>
								<h5>{user.name}</h5>
								<h5>{user.status}</h5>
							</div>
							<div>
								<h5>{'user.location.city'}</h5>
								<h5>{'user.location.country'}</h5>
							</div>
							{
								user.followed ? 

								<button disabled={props.followingInProgress.some(id => id === user.id)} // - 'some' means if at list one

										onClick= { () => { props.unfollowThunk(user.id) } } >Unfollow</button> :

								<button disabled={props.followingInProgress.some(id => id === user.id)} 

										onClick= { () => { props.followThunk(user.id) } } >Follow</button>
							}
						</div>
					)

				}) 
			}
		</div>
		
	)

}

export default Users;