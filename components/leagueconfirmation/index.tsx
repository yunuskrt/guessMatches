import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { RiEmotionUnhappyLine } from 'react-icons/ri'
import PredictionProps from '@models/prediction'
import { CookieHandler } from '@services/cookies'
import { useGlobalContext } from '@contexts/context'
import { useRouter } from 'next/router'

const NotFound = () => {
	const router = useRouter()
	return (
		<Stack gap={2} className='d-flex align-items-center w-100'>
			<RiEmotionUnhappyLine size={200} />
			<div>No Saved Matches Found.</div>
			<Button
				className='px-2 py-3 my-2'
				variant='outline-success'
				onClick={() => {
					router.push('/')
				}}
			>
				Go Add Matches
			</Button>
		</Stack>
	)
}

type Props = {}

interface SelectedValues {
	[matchId: number]: object
}

const LeagueConfirmation = (props: Props) => {
	const { theme, matchCookieChanged } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	const [preds, setPreds] = useState<PredictionProps[] | null>(null)
	useEffect(() => {
		const matches = CookieHandler.getPredictions
		setPreds(matches)
	}, [matchCookieChanged])

	const options: React.JSX.Element[] = []
	for (let i = 1; i <= 10; i++) {
		options.push(
			<option key={i} value={i}>
				{i}
			</option>
		)
	}

	const [selectedValues, setSelectedValues] = useState<SelectedValues>({})
	useEffect(() => {
		let matches: PredictionProps[] | null = CookieHandler.getPredictions()
		if (matches) {
			let initialSelectedValues: SelectedValues = {}

			matches.forEach((match) => {
				initialSelectedValues[match.id] = { ...match, point: 1 } // Set default value of '1' for each match
			})
			setSelectedValues(initialSelectedValues)
		}
	}, [])
	const handleSelectChange = (matchId: number, value: object) => {
		setSelectedValues((prevSelectedValues) => ({
			...prevSelectedValues,
			[matchId]: value,
		}))
	}
	const handleFormSubmission = () => {
		// Access the selected values from the state
		console.log('Selected Values:', selectedValues)

		// Perform your database operations using the selectedValues object
	}
	return (
		<div className={`text-${otherTheme}`}>
			{preds ? (
				preds.length !== 0 ? (
					<div>
						<Stack gap={4} className='d-flex align-items-center w-100'>
							{preds
								.sort((a, b) => {
									return new Date(a.date).getTime() - new Date(b.date).getTime()
								})
								.map((match, index) => {
									return (
										<Container key={match.id}>
											<Row className='border border-2 rounded-3 p-4 d-flex align-items-center fs-6'>
												<Col xs={4}>
													{match.homeTeam} - {match.awayTeam}
												</Col>
												<Col>{match.title}</Col>
												<Col>{match.pred}</Col>
												<Col xs={4}>{match.date}</Col>
												<Col>
													<Form.Group>
														<Form.Select
															defaultValue='1'
															onChange={(e) =>
																handleSelectChange(match.id, {
																	...match,
																	point: parseInt(e.target.value),
																})
															}
															style={{ width: '60px', padding: '5px' }}
														>
															{options}
														</Form.Select>
													</Form.Group>
												</Col>
											</Row>
										</Container>
									)
								})}
						</Stack>
						<div className='d-flex justify-content-end'>
							<Button
								variant='success'
								className='me-3 my-3'
								onClick={() => handleFormSubmission()}
							>
								Confirm
							</Button>
						</div>
						<div className='px-4 fw-light fs-6 text-center'>
							3 - Confirm your preferences.
						</div>
					</div>
				) : (
					<NotFound />
				)
			) : (
				<NotFound />
			)}
		</div>
	)
}

export default LeagueConfirmation
