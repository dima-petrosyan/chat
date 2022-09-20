
import React, { useState, useEffect } from 'react'

function ProfileStatusWithHooks(props) {

	// useState return definition and function you can change the definition with
	const [editMode, setEditMode] = useState(false)
	const [status, setStatus] = useState(props.status)

	// useEffect is called after component had already been rendered or rerendered, after returning jsx
	// call this hook every time when props.status has changed
	useEffect(() => {
		setStatus(props.status)
	}, [props.status])

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateStatus(status)
	}

	const onStatusChange = (event) => {
		setStatus(event.currentTarget.value)
	}

	return (
		<div>
		{ !editMode &&
			<div>
				<div onDoubleClick={activateEditMode}>{props.status || 'No status'}</div> 
			</div>
		}
		{ editMode &&
			<input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
		}
		</div>
	)
	
}

export default ProfileStatusWithHooks










