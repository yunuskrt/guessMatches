import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '@components/layout'
import AppProvider from '@contexts/context'
import { SSRProvider } from 'react-bootstrap'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			<AppProvider>
				<Layout app={<Component {...pageProps} />} />
			</AppProvider>
		</SSRProvider>
	)
}

export default MyApp
