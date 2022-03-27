import { useNFTCollection, useSDK } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw'

function MyNFTs() {
  const sdk = useSDK()
  const [constants] = useRecoilState(constantState)
  const nftCollection = useNFTCollection(constants.collection)
  const marketplace = sdk?.getMarketplace(constants.market)
  const [myNFTs, setMyNFTs] = useState<any>([])

  const getMyNFTs = async () => {
    const nfts = await nftCollection?.getOwned().then((nfts) => {
      setMyNFTs(nfts)
      nfts.map((nft: any) => {
        console.log(nft.metadata.id)
      })
    })
    console.log(myNFTs)
  }

  const createListing = async (e: any) => {
    console.log(e.target.key)
    const auction = {
      // address of the contract the asset you want to list is on
      assetContractAddress: constants.collection,
      // token ID of the asset you want to list
      tokenId: '0',
      // in how many seconds with the listing open up
      startTimeInSeconds: 0,
      // how long the listing will be open for
      listingDurationInSeconds: 86400,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      // use NATIVE_TOKEN_ADDRESS or don't pass currencyContractAddress to use
      // the native token of the chain, (ETH for Ethereum, MATIC for Polygon, etc.)
      currencyContractAddress: constants.token,
      // how much people would have to bid to instantly buy the asset
      buyoutPricePerToken: '10',
      // the minimum bid that will be accepted for the token
      reservePricePerToken: '1.5',
    }

    // try {
    //   const tx = await marketplace.auction.createListing(auction)
    //   const receipt = tx.receipt // the transaction receipt
    //   const listingId = tx.id // the id of the newly created listing
    // } catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <div className="flex h-5/6 w-full select-none items-center justify-center">
      <div className="mt-5 flex h-5/6 w-4/6 flex-col items-center space-y-1 space-x-1 rounded-xl border bg-bg px-1">
        <div className="mx-5 mt-1 flex h-10 w-full items-center justify-between self-start text-lg text-white">
          <span className="">Your NFTs</span>
          <button
            onClick={() => getMyNFTs()}
            className="mr-10 rounded-lg bg-card-border px-4 text-bg"
          >
            GET
          </button>
        </div>
        <div className="grid h-full w-full grid-cols-2 items-center space-y-1 space-x-1 overflow-y-scroll rounded-xl bg-bg p-5 pt-0 text-white scrollbar-thin scrollbar-thumb-card-border ">
          {myNFTs.map((nft: any) => (
            <div
              key={nft.metadata.id}
              className="flex h-[40rem] w-full flex-col items-center self-center rounded-xl border border-card-border bg-card-bg"
            >
              <img
                src={nft.metadata.image}
                alt=""
                className="h-5/6 w-full flex-1 rounded-t-xl border-b border-b-white object-cover"
              />
              <span>{nft.metadata.name}</span>
              <span>{nft.metadata.description}</span>
              <button type='button' key={ nft.metadata.id } onClick={(e:any) => createListing(e) }>List</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyNFTs
