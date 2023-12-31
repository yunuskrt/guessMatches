import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import TabBar from '@components/tabbar'
import MatchProps from '@models/match'
import { useGlobalContext } from '@contexts/context'

type Props = {
	match: MatchProps
	show: boolean
	preference: any
	handleClose: () => void
	handleSelect: (k: string | null) => void
}

const MatchModal = ({
	match,
	show,
	preference,
	handleClose,
	handleSelect,
}: Props) => {
	const data = {
		ms: [
			['ms-1', 'ms-0', 'ms-2'],
			['1', '0', '2'],
		],
		cfs: [
			['cfs-1-X', 'cfs-1-2', 'cfs-X-2'],
			['1-X', '1-2', 'X-2'],
		],
		hms10: [
			['hms10-1', 'hms10-0', 'hms10-2'],
			['1', '0', '2'],
		],
		hms01: [
			['hms01-1', 'hms01-0', 'hms01-2'],
			['1', '0', '2'],
		],
		au: [
			['tgau-Alt', 'tgau-Ust'],
			['Alt', 'Ust'],
		],
		kg: [
			['kg-Var', 'kg-Yok'],
			['Var', 'Yok'],
		],
		tg: [
			['tg-0-2', 'tg-3-5', 'tg-6+'],
			['0-2', '3-5', '6+'],
		],
	}
	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	return (
		<Modal show={show} onHide={handleClose} keyboard={false} centered>
			<Modal.Header closeButton className={`bg-${theme} text-${otherTheme}`}>
				<Modal.Title>
					{match.homeTeam} - {match.awayTeam}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={`bg-${theme}`}>
				<Accordion defaultActiveKey={['0']} alwaysOpen>
					<Accordion.Item eventKey='0'>
						<Accordion.Header>TARAF</Accordion.Header>
						<Accordion.Body className={`bg-${theme}`}>
							<Table striped bordered hover variant={theme}>
								<tbody>
									<tr>
										<th>Mac Sonucu</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.ms[0]}
												titles={data.ms[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
									<tr>
										<th>Cifte Sans</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.cfs[0]}
												titles={data.cfs[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
									<tr>
										<th>Handikapli Mac Sonucu (1:0)</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.hms10[0]}
												titles={data.hms10[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
									<tr>
										<th>Handikapli Mac Sonucu (0:1)</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.hms01[0]}
												titles={data.hms01[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
								</tbody>
							</Table>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey='1'>
						<Accordion.Header>GOL</Accordion.Header>
						<Accordion.Body className={`bg-${theme}`}>
							<Table striped bordered hover variant={theme}>
								<tbody>
									<tr>
										<th>Toplam Gol Alt/Ust</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.au[0]}
												titles={data.au[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
									<tr>
										<th>Karsilikli Gol</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.kg[0]}
												titles={data.kg[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
									<tr>
										<th>Toplam Gol</th>
										<td>
											<TabBar
												preference={preference}
												eventKeys={data.tg[0]}
												titles={data.tg[1]}
												onSelected={(k) => {
													handleSelect(k)
												}}
											/>
										</td>
									</tr>
								</tbody>
							</Table>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Modal.Body>
			<Modal.Footer
				className={`bg-${theme} text-${otherTheme} d-flex justify-content-between`}
			>
				<div>{match.date}</div>
				<div>{match.league}</div>
			</Modal.Footer>
		</Modal>
	)
}

export default MatchModal
