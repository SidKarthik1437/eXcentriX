import React from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import Link from 'next/link'

function Header() {


  return (
    <div className="fonta flex h-14 w-full items-center justify-between bg-bg px-4 select-none border-b-card-bg border-b rounded-b">
      <Link href={'/'}>
        <span className="text-2xl tracking-widest">
        eXcentriX

        </span>
      </Link>
      <div className="flex space-x-4 text-xl">
        <Link href={'/Mint'}>mint</Link>
        <Link href={'/MyNFTs'}>my nfts</Link>
      </div>
    </div>
  )
}

export default Header