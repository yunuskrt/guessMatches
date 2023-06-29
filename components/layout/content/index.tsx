import React, { ReactNode } from 'react'
import Container from 'react-bootstrap/Container'

type Props = {
	children: ReactNode
}

const Content = ({ children }: Props) => {
	return (
		<Container fluid='xl' className='justify-content-md-center p-3'>
			{children}
		</Container>
	)
}

export default Content
