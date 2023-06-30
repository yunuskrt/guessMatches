import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '@components/layout'
import AppProvider from '@contexts/context'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AppProvider>
			<Layout app={<Component {...pageProps} />} />
		</AppProvider>
	)
}

export default MyApp
