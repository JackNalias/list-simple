import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutPrimary from '../layouts/LayoutPrimary'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutPrimary>
      <Component {...pageProps} />
    </LayoutPrimary>
  )
}

export default MyApp
