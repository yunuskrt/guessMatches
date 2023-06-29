import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '@components/layout'

function MyApp({ Component, pageProps }: AppProps) {
	return <Layout app={<Component {...pageProps} />} />
}

export default MyApp
