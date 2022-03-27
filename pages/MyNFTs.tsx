import { useNFTCollection } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw'

function MyNFTs() {
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      '6d09837e6eb3efde7b011a01f1755e937c432f4b5ec093bc40d21e03d37f7f48',
      ethers.getDefaultProvider(
        'https://polygon-mumbai.g.alchemy.com/v2/AcXFFT7NPRJ2ESL4cQB-wxRuqJ_Y9-6_'
      )
    )
  )
  const [constants] = useRecoilState(constantState)
  const nftCollection = useNFTCollection(constants.collection)
  const [myNFTs, setMyNFTs] = useState<any>([])

  const getMyNFTs = async () => {
    const nfts = await nftCollection?.getOwned().then((nfts) => {
      setMyNFTs(nfts)
    })
    console.log(myNFTs)
  }

  return (
    <div className="flex h-5/6 w-full select-none items-center justify-center">
      <div className="flex h-5/6 w-4/6 flex-col items-center space-y-1 space-x-1 rounded-xl border bg-bg px-1 mt-5">
        <div className="mx-5 flex h-10 w-full items-center justify-between self-start text-lg text-white mt-1">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyNFTs
