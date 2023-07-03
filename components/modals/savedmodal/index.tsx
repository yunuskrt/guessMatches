import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'
import { RiEmotionUnhappyLine } from 'react-icons/ri'
import { CookieHandler } from '@services/cookies'
import PredictionProps from '@models/prediction'
import { useGlobalContext } from '@contexts/context'

type Props = {
	show: boolean
	handleClose: () => void
	matches: PredictionProps[] | null
}
const NotFound = () => {
	return (
		<Stack gap={2} className='col-md-5 mx-auto d-flex align-items-center'>
			<RiEmotionUnhappyLine size={100} />
			<div>No Saved Matches Found.</div>
		</Stack>
	)
}
const SavedModal = ({ show, handleClose, matches }: Props) => {
	const { theme, handleMatchCookieChange } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	const isNotFound = matches === null || matches.length === 0
	return (
		<Modal show={show} onHide={handleClose} keyboard={false} size='lg'>
			<Modal.Header closeButton className={`bg-${theme} text-${otherTheme}`}>
				<Modal.Title>Saved Matches</Modal.Title>
			</Modal.Header>
			<Modal.Body className={`bg-${theme} text-${otherTheme}`}>
				{isNotFound ? (
					<NotFound />
				) : (
					<Table borderless striped hover variant={theme}>
						<thead>
							<tr>
								<th>#</th>
								<th colSpan={2}></th>
								<th>Title</th>
								<th>Prediction</th>
								<th>Date</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{matches
								.sort((a, b) => {
									return new Date(a.date).getTime() - new Date(b.date).getTime()
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
											<td>{match.date}</td>
											<td>
												<Button
													variant='danger'
													onClick={() => {
														CookieHandler.removePrediction(match.id)
														handleMatchCookieChange()
													}}
												>
													Remove
												</Button>
											</td>
										</tr>
									)
								})}
						</tbody>
					</Table>
				)}
			</Modal.Body>
			<Modal.Footer className={`bg-${theme} text-${otherTheme}`}>
				<Button
					variant={`outline-${otherTheme}`}
					onClick={() => {
						CookieHandler.removeCookie('matches')
						handleMatchCookieChange()
					}}
				>
					Clear Matches
				</Button>
				<Button variant='outline-success' disabled={isNotFound}>
					Create League
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
export default SavedModal
