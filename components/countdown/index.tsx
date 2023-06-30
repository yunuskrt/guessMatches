import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useGlobalContext } from '@contexts/context'
type Props = {
	date: string
}

const Countdown = ({ date }: Props) => {
	const [countdown, setCountdown] = useState('')
	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'

	useEffect(() => {
		const specifiedDate = moment(date, 'YYYY-MM-DD HH:mm')
		const interval = setInterval(() => {
			const currentDate = moment()
			const countdownDuration = moment.duration(specifiedDate.diff(currentDate))
			const cntdown = {
				days: countdownDuration.days(),
				hours: countdownDuration.hours(),
				mins: countdownDuration.minutes(),
				secs: countdownDuration.seconds(),
			}
			const countdown = `${
				cntdown.days < 10 ? `0${cntdown.days}` : cntdown.days
			}:${cntdown.hours < 10 ? `0${cntdown.hours}` : cntdown.hours}:${
				cntdown.mins < 10 ? `0${cntdown.mins}` : cntdown.mins
			}:${cntdown.secs < 10 ? `0${cntdown.secs}` : cntdown.secs}`
			setCountdown(countdown)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	if (countdown.includes('NaN')) {
		return <div></div>
	}
	return (
		<div className={`text-${otherTheme}`}>
			<div>{date}</div>
			<div>{countdown}</div>
		</div>
	)
}

export default Countdown
