import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

type Props = {
	preference: string
	eventKeys: string[]
	titles: string[]
	onSelected: (k: string | null) => void
}

const TabBar = ({ preference, eventKeys, titles, onSelected }: Props) => {
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
						tabClassName={
							preference === eventkey ? 'text-light bg-dark' : 'text-dark'
						}
					></Tab>
				)
			})}
		</Tabs>
	)
}

export default TabBar
