import React from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import Link from 'next/link'
import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react'

function Header() {

  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()

  return (
    <div className="fonta flex h-14 w-full select-none items-center justify-between rounded-b border-b border-b-card-bg bg-bg px-4 z-50 absolute top-0">
      <Link href={'/'}>
        <span className="text-2xl tracking-widest">eXcentriX</span>
      </Link>
      <div className="flex items-center space-x-4 text-xl">
        <Link href={'/Mint'}>mint</Link>
        <Link href={'/MyNFTs'}>my nfts</Link>
        {address ? (
          <button onClick={() => disconnect()} className="rounded-lg border border-blue-500 p-1 text-base">
            Connected
          </button>
        ) : (
          <button
            onClick={() => connectWithMetamask()}
            className="rounded-lg bg-blue-500 p-1 text-base"
          >
            Connect Metamask
          </button>
        )}
      </div>
    </div>
  )
}

export default Header