import React, {
	ReactNode,
	createContext,
	useState,
	useContext,
	useEffect,
} from 'react'
import { CookieHandler } from '@services/cookies'

interface AppContextType {
	theme: 'light' | 'dark'
	handleTheme: () => void
	matchCookieChanged: boolean
	handleMatchCookieChange: () => void
	unlockCreate: {
		register: boolean
		leagueinfo: boolean
		confirmation: boolean
	}
	handleUnlockCreate: (body: 'register' | 'leagueinfo' | 'confirmation') => void
	createIndex: number
	handleCreateIndex: (index: 0 | 1 | 2) => void
}

export const AppContext = createContext<AppContextType>({
	theme: 'light',
	handleTheme: () => {},
	matchCookieChanged: false,
	handleMatchCookieChange: () => {},
	unlockCreate: { register: true, leagueinfo: false, confirmation: false },
	handleUnlockCreate: () => {},
	createIndex: 0,
	handleCreateIndex: () => {},
})

type Props = {
	children: ReactNode
}
const AppProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	const [matchCookieChanged, setMatchCookieChanged] = useState(false)
	const [unlockCreate, setUnlockCreate] = useState({
		register: true,
		leagueinfo: false,
		confirmation: false,
	})
	const [createIndex, setCreateIndex] = useState(0)

	useEffect(() => {
		var theme = CookieHandler.getCookie('theme')
		if (typeof theme === 'string' && (theme === 'light' || theme === 'dark')) {
			setTheme(theme)
		}
	}, [])
	const handleTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
			CookieHandler.setCookie('theme', 'dark', 3)
		} else {
			setTheme('light')
			CookieHandler.setCookie('theme', 'light', 3)
		}
	}
	const handleMatchCookieChange = () => {
		setMatchCookieChanged(!matchCookieChanged)
	}

	const handleUnlockCreate = (
		body: 'register' | 'leagueinfo' | 'confirmation'
	) => {
		let copyCreate = unlockCreate
		copyCreate[body] = true
		setUnlockCreate(copyCreate)
	}

	const handleCreateIndex = (index: 0 | 1 | 2) => {
		setCreateIndex(index)
	}
	return (
		<AppContext.Provider
			value={{
				theme,
				handleTheme,
				matchCookieChanged,
				handleMatchCookieChange,
				unlockCreate,
				handleUnlockCreate,
				createIndex,
				handleCreateIndex,
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
