import React, { useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import Link from 'next/link'
import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react'

function Header() {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()

  const [open, setOpen] = useState(true)

  return (
    <aside className="min-w-14 max-w-32 absolute top-0 left-2 z-50 flex h-full select-none flex-col items-center rounded-b border-b">
        <div
          className={`my-4 flex h-full w-${open ?'14' : '32'} flex-col items-center rounded-xl bg-card-bg transition-all duration-100 ease-in-out`}
        >
          <Link href={'/'}>
            <span className="fonta flex text-2xl tracking-widest ">X</span>
          </Link>
          <div className="fontp flex h-full flex-col">
            <div className="flex flex-col items-center text-xl">
              <Link href={'/Mint'}>
                <span className="">Mint</span>
              </Link>
              <Link href={'/MyNFTs'}>
                <span>Vault</span>
              </Link>
            </div>
          </div>
          <div className="fontp">
            {address ? (
              <button
                onClick={() => disconnect()}
                className="rounded-lg border border-blue-500 p-1 text-base"
              >
                Connected
              </button>
            ) : (
              <button
                onClick={() => connectWithMetamask()}
                className="rounded-lg bg-blue-500 p-1 text-base"
              >
                Wallet
              </button>
            )}
          </div>
        </div>
      
    </aside>
  )
}

export default Header
