import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { useGlobalContext } from '@contexts/context'

type Props = {
	preference: string
	eventKeys: string[]
	titles: string[]
	onSelected: (k: string | null) => void
}

const TabBar = ({ preference, eventKeys, titles, onSelected }: Props) => {
	const { theme } = useGlobalContext()
	const otherTheme = theme === 'light' ? 'dark' : 'light'
	return (
		<Tabs
			id='controlled-tab-example'
			activeKey={preference}
			onSelect={onSelected}
			className='mb-2'
			justify
		>
			{eventKeys.map((eventkey, index) => {
				const title = titles[index]
				return (
					<Tab
						key={eventkey}
						eventKey={eventkey}
						title={title}
						tabClassName={`${
							preference == eventkey
								? `text-${theme} bg-${otherTheme}`
								: `text-${otherTheme}`
						}`}
					></Tab>
				)
			})}
		</Tabs>
	)
}

export default TabBar
