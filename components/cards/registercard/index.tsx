import React from 'react'
import Card from 'react-bootstrap/Card'
import { GoDot, GoDotFill } from 'react-icons/go'
import { useGlobalContext } from '@contexts/context'
import styles from './registercard.module.css'
import RegisterBody from './registerbody'
import LeagueInfoBody from './leagueinfobody'
import ConfirmationCreateBody from './confirmationcreatebody'

type Props = {}

const RegisterCard = (props: Props) => {
	const { theme, unlockCreate, createIndex, handleCreateIndex } =
		useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'

	return (
		<div
			style={{
				minHeight: '90vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Card
				bg={theme}
				text={otherTheme}
				className={`shadow-lg ${styles.cardcontainer}`}
			>
				<Card.Header className='d-flex justify-content-center p-3'>
					{createIndex === 0 ? (
						<div>Register</div>
					) : createIndex === 1 ? (
						<div>League Info</div>
					) : (
						<div>Confirmation</div>
					)}
				</Card.Header>
				<Card.Body className='h-100 d-flex flex-column overflow-auto'>
					{createIndex === 0 ? (
						// Body of register screen
						<RegisterBody />
					) : createIndex === 1 ? (
						// Body of league info screen (league name - league password)
						<LeagueInfoBody />
					) : (
						// Body of predictions and confirmation screen
						<ConfirmationCreateBody />
					)}
				</Card.Body>
				<Card.Footer className='text-muted p-2 text-center'>
					{createIndex === 0 ? (
						<GoDotFill className={`text-${otherTheme} ${styles.dot}`} />
					) : (
						<GoDot
							className={`text-${otherTheme} ${styles.dot}`}
							onClick={() => {
								handleCreateIndex(0)
							}}
						/>
					)}
					{createIndex === 1 ? (
						<GoDotFill className={`text-${otherTheme} ${styles.dot}`} />
					) : (
						<GoDot
							className={`text-${otherTheme} ${styles.dot}`}
							onClick={() => {
								if (unlockCreate.leagueinfo) {
									handleCreateIndex(1)
								}
							}}
						/>
					)}
					{createIndex === 2 ? (
						<GoDotFill className={`text-${otherTheme} ${styles.dot}`} />
					) : (
						<GoDot
							className={`text-${otherTheme} ${styles.dot}`}
							onClick={() => {
								if (unlockCreate.confirmation) {
									handleCreateIndex(2)
								}
							}}
						/>
					)}
				</Card.Footer>
			</Card>
		</div>
	)
}

export default RegisterCard
