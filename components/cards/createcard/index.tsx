import React, { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useGlobalContext } from '@contexts/context'
import { CookieHandler } from '@services/cookies'
import { useRouter } from 'next/router'
import { GoDot, GoDotFill } from 'react-icons/go'
import styles from './createcard.module.css'

type RegisterProps = {
	setUnlockedLeagueInfo: React.Dispatch<React.SetStateAction<boolean>>
	setIndex: React.Dispatch<React.SetStateAction<number>>
}

const RegisterBody = ({ setUnlockedLeagueInfo, setIndex }: RegisterProps) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [isValid, setValid] = useState(true)
	const [defaultUsername, setDefaultUsername] = useState('')
	useEffect(() => {
		const username = CookieHandler.getCookie('username')
		if (typeof username === 'string') {
			setDefaultUsername(username)
		}
	}, [])
	const { theme } = useGlobalContext()
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
			setUnlockedLeagueInfo(true)
			setIndex(1)
		}
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

type Props = {}

const LeagueInfoBody = (props: Props) => {
	const nameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)

	const [nameValid, setNameValid] = useState(true)
	const [passwordValid, setPasswordValid] = useState(true)

	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'

	const router = useRouter()
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
			router.push('/confirm')
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
						Go to Confirmation
					</Button>
				</div>
			</Form>
			<div className='px-4 fw-light fs-6 text-center'>
				2 - Determine the league informations.
			</div>
		</div>
	)
}

const CreateCard = (props: Props) => {
	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	const [unlockedLeagueInfo, setUnlockedLeagueInfo] = useState(false)
	const [index, setIndex] = useState(0)
	return (
		<div
			className={`d-flex justify-content-center align-items-center ${styles.cardwrapper}`}
		>
			<Card
				bg={theme}
				text={otherTheme}
				className={`shadow-lg ${styles.cardcontainer}`}
			>
				<Card.Header className='d-flex justify-content-center p-3'>
					{index === 0 ? <div>Register</div> : <div>League Info</div>}
				</Card.Header>
				<Card.Body className='h-100 d-flex flex-column overflow-auto'>
					{index === 0 ? (
						<RegisterBody
							setUnlockedLeagueInfo={setUnlockedLeagueInfo}
							setIndex={setIndex}
						/>
					) : (
						<LeagueInfoBody />
					)}
				</Card.Body>
				<Card.Footer className='text-muted p-2 text-center'>
					{index === 0 ? (
						<GoDotFill className={`text-${otherTheme} ${styles.dot}`} />
					) : (
						<GoDot
							className={`text-${otherTheme} ${styles.dot}`}
							onClick={() => {
								setIndex(0)
							}}
						/>
					)}
					{index === 1 ? (
						<GoDotFill className={`text-${otherTheme} ${styles.dot}`} />
					) : (
						<GoDot
							className={`text-${otherTheme} ${styles.dot}`}
							onClick={() => {
								if (unlockedLeagueInfo) {
									setIndex(1)
								}
							}}
						/>
					)}
				</Card.Footer>
			</Card>
		</div>
	)
}

export default CreateCard
