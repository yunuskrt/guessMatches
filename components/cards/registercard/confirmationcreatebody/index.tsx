import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
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

const ConfirmationCreateBody = (props: Props) => {
	const { theme, matchCookieChanged } = useGlobalContext()
	const [preds, setPreds] = useState<PredictionProps[] | null>(null)
	useEffect(() => {
		const matches = CookieHandler.getPredictions
		setPreds(matches)
	}, [matchCookieChanged])

	return (
		<div>
			{preds ? (
				preds.length !== 0 ? (
					<div>
						<Table borderless striped hover variant={theme}>
							<tbody>
								{preds
									.sort((a, b) => {
										return (
											new Date(a.date).getTime() - new Date(b.date).getTime()
										)
									})
									.map((match, index) => {
										return (
											<tr key={match.id}>
												<td>{index + 1}</td>
												<td colSpan={2}>
													{match.homeTeam} - {match.awayTeam}
												</td>
												<td>{match.title}</td>
												<td>{match.pred}</td>
											</tr>
										)
									})}
							</tbody>
						</Table>
						<div className='d-flex justify-content-end'>
							<Button
								variant='success'
								className='me-3 my-3'
								onClick={() => {
									console.log('Database Operations')
								}}
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

export default ConfirmationCreateBody
