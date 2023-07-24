import React from 'react'
import LeagueConfirmation from '@components/leagueconfirmation'
import NotFound from '@components/notfound'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@contexts/context'

const Confirm = () => {
	const router = useRouter()
	const { confirmationId } = router.query
	const { leagueId } = useGlobalContext()

	return (
		<div className='text-light'>
			{leagueId === null || leagueId === '' ? (
				<NotFound />
			) : confirmationId === leagueId ? (
				<LeagueConfirmation />
			) : (
				<NotFound />
			)}
		</div>
	)
}

export default Confirm
