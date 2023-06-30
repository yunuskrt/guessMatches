import React, { ReactNode, createContext, useState, useContext } from 'react'

export const AppContext = createContext({
	theme: 'light',
	handleTheme: () => {},
})

type Props = {
	children: ReactNode
}
const AppProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState('light')
	const handleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
	}
	return (
		<AppContext.Provider
			value={{
				theme,
				handleTheme,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
export const useGlobalContext = () => {
	return useContext(AppContext)
}
export default AppProvider
