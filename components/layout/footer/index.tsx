import React from 'react'
import { useGlobalContext } from '@contexts/context'

type Props = {}

const index = (props: Props) => {
	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	return (
		<footer
			className={`d-flex justify-content-center bg-${theme} text-${otherTheme} py-2`}
		>
			© 2023 All Rights Reserved
		</footer>
	)
}

export default index
