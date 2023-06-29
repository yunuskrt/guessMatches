import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import IconButton from '@components/iconbutton'
import Countdown from '@components/countdown'
import TabBar from '@components/tabbar'
import { FiMoreHorizontal } from 'react-icons/fi'
import MatchProps from '@models/match'
import styles from './matchcard.module.css'
import MatchModal from '@components/modals/matchmodal'

const MatchCard = (match: MatchProps) => {
	const data = {
		ms: [
			['ms-1', 'ms-0', 'ms-2'],
			['1', '0', '2'],
		],
		au: [
			['ms2.5a', 'ms2.5u'],
			['Alt', 'Ust'],
		],
		kg: [
			['kgvar', 'kgyok'],
			['Var', 'Yok'],
		],
	}
	const [preference, setPreference] = useState<any>('')
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const handleSelect = (k: string | null) => {
		if (k == preference) {
			setPreference('')
		} else {
			setPreference(k)
		}
		console.log(match.id)
	}
	return (
		<>
			<Col key='a' xs={12} sm={6} md={4} lg={3}>
				<Card className='shadow text-center p-3'>
					<Card.Header className='d-flex justify-content-between p-3'>
						<div>{match.league}</div>
						<IconButton
							id='more'
							icon=<FiMoreHorizontal size={25} />
							onClick={handleShow}
							tooltipMessage='Check for more bet options'
						/>
					</Card.Header>
					<Card.Body>
						<Card.Title className={styles.cardtitlecontainer}>
							{match.homeTeam} - {match.awayTeam}
						</Card.Title>

						<TabBar
							preference={preference}
							eventKeys={data.ms[0]}
							titles={data.ms[1]}
							onSelected={(k) => {
								handleSelect(k)
							}}
						/>
						<TabBar
							preference={preference}
							eventKeys={data.au[0]}
							titles={data.au[1]}
							onSelected={(k) => {
								handleSelect(k)
							}}
						/>
						<TabBar
							preference={preference}
							eventKeys={data.kg[0]}
							titles={data.kg[1]}
							onSelected={(k) => {
								handleSelect(k)
							}}
						/>
					</Card.Body>
					<Card.Footer className='text-muted p-2'>
						<Countdown date={match.date} />
					</Card.Footer>
				</Card>
			</Col>
			<MatchModal
				match={match}
				show={show}
				preference={preference}
				handleClose={handleClose}
				handleSelect={handleSelect}
			/>
		</>
	)
}

export default MatchCard
