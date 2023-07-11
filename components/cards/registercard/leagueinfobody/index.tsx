import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useGlobalContext } from '@contexts/context'

type Props = {}
const LeagueInfoBody = (props: Props) => {
	const nameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const [nameValid, setNameValid] = useState(true)
	const [passwordValid, setPasswordValid] = useState(true)

	const { theme, handleUnlockCreate, handleCreateIndex } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const nameValue = nameRef.current?.value || ''
		const passwordValue = passwordRef.current?.value || ''

		let nameValidation = false
		let passwordValidation = false

		// Validate the input value
		if (nameValue.length < 5 || nameValue.length > 10) {
			setNameValid(false)
			nameRef.current?.classList.add('is-invalid')
		} else {
			setNameValid(true)
			nameRef.current?.classList.remove('is-invalid')
			nameValidation = true
		}

		if (passwordValue.length > 8) {
			setPasswordValid(false)
			passwordRef.current?.classList.add('is-invalid')
		} else {
			setPasswordValid(true)
			passwordRef.current?.classList.remove('is-invalid')
			passwordValidation = true
		}

		if (nameValidation && passwordValidation) {
			// Process the correct submission
			console.log({
				leagueName: nameValue,
				leaguePassword: passwordValue,
			})
			handleUnlockCreate('confirmation')
			handleCreateIndex(2)
		}
	}
	return (
		<div className='h-100 d-flex flex-column justify-content-evenly'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='nameInput'>
					<Form.Label className='mb-2'>* Enter League Name</Form.Label>
					<Form.Control
						size='lg'
						type='text'
						ref={nameRef}
						className={nameValid ? '' : 'is-invalid'}
						autoComplete='off'
					/>
					{!nameValid && (
						<div className='invalid-feedback'>
							League name must be between 5 and 10 characters.
						</div>
					)}
				</Form.Group>
				<Form.Group controlId='passwordInput'>
					<Form.Label className='mb-2 mt-4'>
						Enter League Password (optional)
					</Form.Label>
					<Form.Control
						size='lg'
						type='password'
						ref={passwordRef}
						autoComplete='off'
					/>
					{!passwordValid && (
						<div className='invalid-feedback'>
							Password can not be more than 8 characters.
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
				2 - Determine the league informations.
			</div>
		</div>
	)
}

export default LeagueInfoBody
