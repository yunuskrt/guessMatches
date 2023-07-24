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
	leagueId: string | null
	handleLeagueId: (id: string) => void
}

export const AppContext = createContext<AppContextType>({
	theme: 'light',
	handleTheme: () => {},
	matchCookieChanged: false,
	handleMatchCookieChange: () => {},
	leagueId: null,
	handleLeagueId: () => {},
})

type Props = {
	children: ReactNode
}
const AppProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	const [matchCookieChanged, setMatchCookieChanged] = useState(false)
	const [leagueId, setLeagueId] = useState<string | null>(null)

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
	const handleLeagueId = (id: string) => {
		setLeagueId(id)
	}

	return (
		<AppContext.Provider
			value={{
				theme,
				handleTheme,
				matchCookieChanged,
				handleMatchCookieChange,
				leagueId,
				handleLeagueId,
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
