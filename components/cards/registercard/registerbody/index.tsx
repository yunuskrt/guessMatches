import React, { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGlobalContext } from '@contexts/context'
import { CookieHandler } from '@services/cookies'

type Props = {}
const RegisterBody = (props: Props) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isValid, setValid] = useState(true)
	const [defaultUsername, setDefaultUsername] = useState('')
	useEffect(() => {
		const username = CookieHandler.getCookie('username')
		if (typeof username === 'string') {
			setDefaultUsername(username)
		}
	}, [])
	const { theme, handleUnlockCreate, handleCreateIndex } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const inputValue = inputRef.current?.value || ''

		// Validate the input value
		if (inputValue.length < 5 || inputValue.length > 10) {
			setValid(false)
			inputRef.current?.classList.add('is-invalid')
		} else {
			setValid(true)
			inputRef.current?.classList.remove('is-invalid')
			// Process the correct submission
			CookieHandler.setCookie('username', inputValue)
			handleUnlockCreate('leagueinfo')
			handleCreateIndex(1)
		}
		console.log(inputValue)
	}
	return (
		<div className='h-100 d-flex flex-column justify-content-evenly'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='formInput'>
					<Form.Label className='mb-2'>* Enter Username</Form.Label>
					<Form.Control
						size='lg'
						type='text'
						ref={inputRef}
						className={isValid ? '' : 'is-invalid'}
						defaultValue={defaultUsername}
						autoComplete='off'
					/>
					{!isValid && (
						<div className='invalid-feedback'>
							Username must be between 5 and 10 characters.
						</div>
					)}
				</Form.Group>
				<div className='text-center'>
					<Button variant={otherTheme} type='submit' className='mt-4 px-3 py-2'>
						Submit
					</Button>
				</div>
			</Form>
			<div className='px-4 fw-light fs-6 text-center'>
				1 - Please enter your username before creating league. We will assign
				your points to that username.
			</div>
		</div>
	)
}

export default RegisterBody
