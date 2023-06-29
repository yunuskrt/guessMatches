import React from 'react'
import Row from 'react-bootstrap/Row'
import MatchCard from '@components/matchcard'
import data from '../data'
import MatchProps from '@models/match'

type Props = {}
const Home = (props: Props) => {
	return (
		<>
			<Row className='g-4'>
				{data.map((match: MatchProps) => (
					<MatchCard key={match.id} {...match} />
				))}
			</Row>
		</>
	)
}

export default Home
