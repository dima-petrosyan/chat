import React from 'react'
import style from './Login.module.css'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../common/FormControls/FormControls.js'
import { required } from '../../utilites/validators/validators.js'
import { connect } from 'react-redux'
import { login } from '../../Redux/authReducer.js'
import { Navigate } from 'react-router-dom'
import { createField } from '../common/FormControls/FormControls.js'

function Login(props) {

	const handleSubmit = (formData) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
	}

	if (props.isAuth) {
		return <Navigate to='/profile' />
	}

	return (
		<div className={style.login}>
			<h1>Login</h1>
			<LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={handleSubmit} />
		</div>
	)
}

function LoginForm(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field name={'email'} placeholder={'Login'} component={Input}
					   validate={[required]} />
			</div>
			<div>
				<Field name={'password'} placeholder={'Password'} component={Input} type={'password'}
					   validate={[required]} />
			</div>
			<div>
				<Field name={'rememberMe'} type={'checkbox'} component={Input} /> Remember me
			</div>
			{
				props.captchaUrl && 
					<div>
						<img style={{width: '100px', height: '50px'}} src={props.captchaUrl} />
						{ createField('Symbols from image', 'captcha', [required], Input, {}) }
					</div>
			}
			{
				props.error && <div className={style.summaryError}>{props.error}</div>
			}
			<div>
				<button>Login</button>
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)

const mapStateToProps = (state) => {
	return {
		captchaUrl: state.auth.captchaUrl,
		isAuth: state.auth.isAuth
	}
}

export default connect(mapStateToProps, {login})(Login)









