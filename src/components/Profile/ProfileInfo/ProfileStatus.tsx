import React from 'react'

type PropsType = {
	status: string
	updateStatus: (status: string) => void
}

type StateType = {
	status: string
	editMode: boolean
}

class ProfileStatus extends React.Component<PropsType, StateType> {

	constructor(props: PropsType) {
		super(props)
		this.handleActivateEditMode = this.handleActivateEditMode.bind(this)
		this.handleDeactivateEditMode = this.handleDeactivateEditMode.bind(this)	
		this.onStatusChange = this.onStatusChange.bind(this)
	}

	state = {
		editMode: false,
		status: this.props.status
	}

	handleActivateEditMode() {
		// setState get object with properties we want to change
		// setState is async function
		// editMode = false
		this.setState({
			editMode: true
		})
		// editMode = false
	}

	handleDeactivateEditMode() {
		this.setState({
			editMode: false
		})
		this.props.updateStatus(this.state.status)
	}

	onStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			status: event.currentTarget.value
		})
	}

	componentDidUpdate(prevProps: PropsType, prevState: StateType) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			})
		}
	}

	render() {
		return (
			<div>
				{
					!this.state.editMode ? 
						<div>
							<div onDoubleClick={this.handleActivateEditMode}>{this.props.status || 'No status'}</div>
						</div> :
						<input onChange={this.onStatusChange} autoFocus={true} onBlur={this.handleDeactivateEditMode} value={this.state.status} />
				}
			</div>
		)
	}
	
}

export default ProfileStatus










