import React, { ReactNode } from 'react'
import Header from '@components/layout/header'
import Content from '@components/layout/content'
import Footer from '@components/layout/footer'

type Props = {
	app: ReactNode
}

const Layout = ({ app }: Props) => {
	return (
		<div>
			<Header />
			<Content>{app}</Content>
			<Footer />
		</div>
	)
}

export default Layout
