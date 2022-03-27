
import { useAddress, useMetamask } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'


const Home: NextPage = () => {

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  console.log(address)

  return (
    <div className="w-full h-screen bg-bg">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {address ? (
        <div className="">
          <Dashboard />
          </div>
      ): (<button onClick={()=>connectWithMetamask()}>
        Connect Metamask
      </button>)}
      
    </div>
  )
}

export default Home
