import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { RecoilRoot } from 'recoil'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = 80001
  const connectors = {
    injected: {},
  }

  return (
    <RecoilRoot>
      <ThirdwebProvider desiredChainId={desiredChainId}>
        <div className="h-screen w-full overflow-y-hidden overflow-x-hidden bg-bg">
          <Header />
          <Component {...pageProps} />
        </div>
      </ThirdwebProvider>
    </RecoilRoot>
  )
}

export default MyApp
