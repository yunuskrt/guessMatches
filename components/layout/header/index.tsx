import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import IconButton from '@components/iconbutton'
import { CgDarkMode, CgEnter } from 'react-icons/cg'
import { PiNotebook } from 'react-icons/pi'
import { MdAddCircleOutline } from 'react-icons/md'
import { ImListNumbered } from 'react-icons/im'
import styles from './header.module.css'
type Props = {}

function OffcanvasExample(props: Props) {
	const [offcanvasVisible, setOffcanvasVisible] = useState(false)

	const handleToggleOffcanvas = () => {
		setOffcanvasVisible((prevVisible) => !prevVisible)
	}

	return (
		<Navbar expand='lg' className='bg-body-tertiary mb-3'>
			<Container fluid>
				<Navbar.Brand href='#'>GuessMatches</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='offcanvasNavbar-expand-lg'
					onClick={handleToggleOffcanvas}
				/>
				<Navbar.Offcanvas
					show={offcanvasVisible}
					onHide={() => setOffcanvasVisible(false)}
					aria-labelledby='offcanvasNavbarLabel-expand-lg'
					placement='end'
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>
							GuessMatches
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body className='p-2'>
						<Nav className='justify-content-end flex-grow-1 pe-4'>
							{offcanvasVisible ? (
								<div
									className={`${styles.offcanvasitem} d-flex align-items-center`}
									onClick={() => setOffcanvasVisible(false)}
								>
									<CgDarkMode className='me-2' size={35} />
									<span>Change Theme</span>
								</div>
							) : (
								<div className='me-2'>
									<IconButton
										id='theme'
										icon=<CgDarkMode size={35} />
										onClick={() => {
											console.log('theme changed')
										}}
										tooltipMessage='Change theme'
									/>
								</div>
							)}
							{offcanvasVisible ? (
								<div
									className={`${styles.offcanvasitem} d-flex align-items-center`}
									onClick={() => setOffcanvasVisible(false)}
								>
									<PiNotebook className='me-2' size={35} />
									<span>Show Saved Matches</span>
								</div>
							) : (
								<div className='me-2'>
									<IconButton
										id='theme'
										icon=<PiNotebook size={35} />
										onClick={() => {
											console.log('theme changed')
										}}
										tooltipMessage='Show saved matches'
									/>
								</div>
							)}
							<NavDropdown
								title={
									offcanvasVisible ? (
										<>
											<ImListNumbered className='me-2 p-1' size={35} />
											<span>League</span>
										</>
									) : (
										'League'
									)
								}
								id='offcanvasNavbarDropdown-expand-lg'
								className={offcanvasVisible ? 'p-2' : 'me-2'}
							>
								<NavDropdown.Item href='#action3'>
									<div className='d-flex align-items-center'>
										<MdAddCircleOutline className='me-2' size={25} />
										<span>Create League</span>
									</div>
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='#action4'>
									<div className='d-flex align-items-center'>
										<CgEnter className='me-2' size={25} />
										<span>Join League</span>
									</div>
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form className='d-flex'>
							<Form.Control
								type='search'
								placeholder='Search'
								className='me-2'
								aria-label='Search'
							/>
							<Button variant='outline-success'>Search</Button>
						</Form>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default OffcanvasExample
