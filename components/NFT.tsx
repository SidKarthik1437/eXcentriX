import { ScaleIcon } from '@heroicons/react/outline'
import { useSDK } from '@thirdweb-dev/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw'

function NFT({ nft, id }: any) {
  const sdk = useSDK()
  const [constants] = useRecoilState(constantState)
  const marketplace = sdk?.getMarketplace(constants.market)

  const createListing = async (e: any) => {
    console.log(id)
    console.log('Starting to List NFT')
    const auction = {
      // address of the contract the asset you want to list is on
      assetContractAddress: constants.collection,
      // token ID of the asset you want to list
      tokenId: id,
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
    //   const tx = await marketplace?.direct.createListing(auction)
    //   const receipt = tx?.receipt // the transaction receipt
    //   const listingId = tx?.id // the id of the newly created listing
    //   console.log(receipt, listingId)
    // } catch (err) {
    //   console.log(err)
    // }
    console.log('NFT Listed!')
  }
  console.log(nft)

  return (
    <div
      className="flex s:h-[25rem] lg:h-[30rem] s:w-[18rem] sm:w-[20rem] lg:w-[22rem] flex-col items-center self-center rounded-xl border border-bright bg-gradient-to-r from-light to-card-border md:transition-all md:duration-300 md:ease-in-out lg:hover:-translate-y-2"
      key={nft.metadata.id}
      id={id}
    >
      <div className="flex h-4/6 w-full items-center justify-center">
        <img
          src={nft.metadata.image}
          alt=""
          className="h-5/6 w-5/6 rounded-tl-3xl rounded-br-3xl rounded-bl rounded-tr object-cover shadow-lg lg:transition-all lg:duration-100 lg:ease-out lg:hover:scale-105"
        />
      </div>
      <div className="ml-8 flex w-full self-start pl-2">
        <span className="text-xl font-bold tracking-widest">
          {nft.metadata.name}
        </span>
        {/* <span className="font-bold">{nft.metadata.description}</span> */}
      </div>
      <div className="ml-8 mt-2 flex h-16 w-4/6 items-center self-start rounded from-light to-card-border pl-2 hover:bg-opacity-60 hover:bg-gradient-to-l hover:shadow-xl">
        <img
          src="https://i.imgur.com/FJjRLVp.jpg"
          className="h-12 w-12 rounded object-cover"
        />
        {/* <div> */}
        <span className="ml-2 min-w-full text-lg font-semibold">excentrix</span>
        {/* </div> */}
      </div>
      <div className="flex h-10 w-full items-center justify-end p-1 ">
        {/* <button
                  className="h-8 w-8 rounded-full hover:bg-card-border "
                  onClick={(e) => setOpen(true)}
                >
                  <PaperAirplaneIcon
                    className="h-6 w-6 rotate-45 pl-1 pb-2"
                    id={id}
                  />
                </button> */}
        <button
          type="button"
          id={id}
          onClick={(e: any) => createListing(e)}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bright"
        >
          <ScaleIcon className=" h-6 w-6" id={id} />
        </button>
      </div>
    </div>
  )
}

export default NFT
