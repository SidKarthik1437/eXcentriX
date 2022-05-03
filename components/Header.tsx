import React, { useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import Link from 'next/link'

import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react'
import { MdOutlineStore } from 'react-icons/md'
import { BsPlusSquareDotted } from 'react-icons/bs'
import { RiWallet3Line } from 'react-icons/ri'
import Image from 'next/image'

function Header() {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnect = useDisconnect()

  const [open, setOpen] = useState(true)

  return (
    <aside className="hidden md:flex min-w-14 max-w-32 absolute top-0 left-2 z-50 h-full select-none flex-col items-center rounded-b border-b">
      <div
        className={`my-4 flex h-full w-16 flex-col items-center rounded-xl bg-card-bg pt-4 transition-all duration-100 ease-in-out`}
      >
        <Link href={'/'}>
          <span className="fonta flex text-4xl tracking-widest ">X</span>
        </Link>
        <hr className="my-5 w-4/6 text-white" />
        <div className="fontp flex h-full w-full flex-col items-center">
          <div className=" flex flex-col items-center space-y-4 text-xl">
            <Link href={'/Mint'}>
              <span className="flex h-10 w-10 items-center justify-center rounded transition-all duration-100 ease-in-out hover:scale-125 hover:bg-bright">
                <BsPlusSquareDotted className="h-8 w-8 text-white antialiased " />
              </span>
            </Link>
            <Link href={'/'}>
              <span className="flex h-10 w-10 items-center justify-center rounded transition-all duration-100 ease-in-out hover:scale-125 hover:bg-bright">
                <MdOutlineStore className="h-8 w-8 text-white antialiased " />
              </span>
            </Link>
            <Link href={'/MyNFTs'}>
              <span className="flex h-10 w-10 items-center justify-center rounded transition-all duration-100 ease-in-out hover:scale-125 hover:bg-bright">
                <RiWallet3Line className="h-8 w-8 text-white antialiased " />
              </span>
            </Link>
          </div>
          <hr className="my-5 w-4/6 text-white" />

          <div className="flex flex-col items-center space-y-4 text-xl">
            <div className="transition-all duration-100 ease-in-out hover:scale-125">
              <img
                src={
                  'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                }
                // layout='intrinsic'
                className="h-10 w-10 rounded object-cover "
              />
            </div>
          </div>
        </div>
        <div className="fontp">
          {address ? (
            <button
              onClick={() => disconnect()}
              className="rounded-lg border border-blue-500 p-1 text-base"
            >
              <RiWallet3Line className="h-8 w-8 text-white antialiased " />
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
