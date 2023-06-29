import React, { ReactNode } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import styles from './iconbutton.module.css'

type Props = {
	id: string
	icon: ReactNode
	onClick: () => void
	tooltipMessage: string
}

const IconButton = ({ id, icon, onClick, tooltipMessage }: Props) => {
	return (
		<OverlayTrigger
			key={id}
			placement='auto'
			overlay={<Tooltip id={`tooltip-${id}`}>{tooltipMessage}</Tooltip>}
		>
			<div className={styles.iconcontainer} onClick={onClick}>
				{icon}
			</div>
		</OverlayTrigger>
	)
}

export default IconButton
