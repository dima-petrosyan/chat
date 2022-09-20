import React from 'react'
import style from './FormControls.module.css'
import { Field } from 'redux-form'
 
export function Textarea({input, meta, ...props}) {
	const isError = meta.touched && meta.error
	return (
		<div className={`${style.formControls} ${ isError && style.error}`}>
			<textarea {...input} {...props} />
			{
				isError && <span>{meta.error}</span>
			}
		</div>
	)
}

export function Input({input, meta, ...props}) {
	const isError = meta.touched && meta.error
	return (
		<div className={`${style.formControls} ${ isError && style.error}`}>
			<input {...input} {...props} />
			{
				isError && <span>{meta.error}</span>
			}
		</div>
	)
}

export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
	return (
		<div>
			<Field placeholder={placeholder} name={name} validate={validators} component={component} {...props} /> 
			{text}
		</div>
	)
}

export default Textarea
