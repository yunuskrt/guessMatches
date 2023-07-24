import React, { ReactNode } from 'react'
import Container from 'react-bootstrap/Container'
import { useGlobalContext } from '@contexts/context'
import styles from './content.module.css'

type Props = {
	children: ReactNode
}

const Content = ({ children }: Props) => {
	const { theme } = useGlobalContext()
	return (
		<div className={`bg-${theme} ${styles.contentcontainer}`}>
			<Container fluid='xl' className='justify-content-md-center p-4'>
				{children}
			</Container>
		</div>
	)
}

export default Content
