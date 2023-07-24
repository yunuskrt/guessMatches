import React from 'react'
import Link from 'next/link'
import Stack from 'react-bootstrap/Stack'
import { RiEmotionUnhappyLine } from 'react-icons/ri'
import { useGlobalContext } from '@contexts/context'

type Props = {}

const NotFound = (props: Props) => {
	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	return (
		<Stack
			gap={4}
			className={`d-flex align-items-center w-100 text-${otherTheme}`}
		>
			<h1>404 - This page could not be found</h1>
			<RiEmotionUnhappyLine size={200} />
			<p>
				Sorry, the page you are looking for does not exist. Please go back to
				the{' '}
				<Link
					href='/'
					className={`text-decoration-underline text-${otherTheme}`}
				>
					homepage.
				</Link>
			</p>
		</Stack>
	)
}

export default NotFound
