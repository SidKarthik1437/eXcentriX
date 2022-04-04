import React, { useEffect, useState } from 'react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { BigNumberish, ethers } from 'ethers'
import { useAddress, useMarketplace } from '@thirdweb-dev/react'
import Header from './Header'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw.js'
import { ShoppingBagIcon } from '@heroicons/react/outline'

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    '6d09837e6eb3efde7b011a01f1755e937c432f4b5ec093bc40d21e03d37f7f48',
    ethers.getDefaultProvider(
      'https://polygon-mumbai.g.alchemy.com/v2/AcXFFT7NPRJ2ESL4cQB-wxRuqJ_Y9-6_'
    )
  )
)

function Dashboard() {
  const [constants] = useRecoilState(constantState)
  const [listings, setListings] = useState<any>()

  const marketplace = useMarketplace(constants.market)

  // useEffect(() => {
  const getAllListings = async () => {
    // setListings(null)
    try {
      await marketplace?.getActiveListings().then((listings) => {
        console.log(listings)
        setListings(listings)
      })
    } catch (err) {
      console.log(err)
    }
  }
  // }, [])

  const buyOut = async (e: any) => {
    console.log(e.target.id)

    let listingId = e.target.id
    const quantityDesired = 1

    await marketplace?.direct.buyoutListing(0, quantityDesired)
  }

  return (
    <div className="mt-14 flex h-screen w-full select-none items-center justify-center overflow-y-hidden">
      <div className="mt flex h-screen w-full flex-col items-center space-y-1 space-x-1 bg-bg px-1 ">
        <button
          onClick={() => getAllListings()}
          className="mt-2 rounded-lg bg-card-border py-1 px-4 text-white"
        >
          Get
        </button>
        <div className="grid h-screen w-full grid-cols-5 items-center space-y-1 space-x-1 overflow-y-scroll rounded-xl bg-bg p-5 pt-0 text-white scrollbar-thin scrollbar-thumb-card-border ">
          {listings?.map((listing: any, id: any) => (
            <div
              className="cols-span-1 flex h-4/6 w-full flex-col items-center self-center rounded-xl border border-card-border bg-card-bg"
              key={listing.id}
              id={id}
            >
              <img
                src={listing.asset.image}
                alt="nft image"
                className="h-4/6 w-full flex-1 rounded-t-xl border-b border-b-white object-cover"
              />
              <div className="flex w-full flex-col px-1 shadow-xl">
                <span className="text-lg">{listing.asset.name}</span>
                <span className="text-md text-gray-400">
                  {listing.asset.description}
                </span>
              </div>
              <div className="flex w-full flex-col px-1 shadow-xl">
                <span className="text-lg">{listing.asset.name}</span>
                <span className="text-md text-gray-400">
                  {listing.asset.description}
                </span>
              </div>
              <button
                type="button"
                id={listing.id}
                onClick={(e: any) => buyOut(e)}
                className="h-8 w-8 rounded-full hover:bg-card-border "
              >
                <ShoppingBagIcon className="ml-1 h-6 w-6 p-1" id={id} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
