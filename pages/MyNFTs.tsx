import { useAddress, useMarketplace, useNFTCollection, useSDK } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { Component, useEffect, useState, Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw'
import { PaperAirplaneIcon, ScaleIcon } from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/outline'
import { Dialog, Transition } from '@headlessui/react'
import NFT from '../components/NFT'

function MyNFTs() {
  const [constants] = useRecoilState(constantState)
  const sdk = useSDK()
  const marketplace = useMarketplace(constants.market)
  const nftCollection = useNFTCollection(constants.collection)
  const [myNFTs, setMyNFTs] = useState<any>([])
  const [tempNFTs, setTempNFTs] = useState<any>([])
  const [final, setFinal] = useState<any>([])

  const [toAdd, setToAdd] = useState('')
  const [open, setOpen] = useState<boolean>(false)

  const getMyNFTs = async () => {
    const allNfts = await nftCollection?.getAll().then((nfts) => {
      setTempNFTs(nfts)
    })
    console.log(tempNFTs)
    const nfts = await nftCollection?.getOwned().then((nfts) => {
      setMyNFTs(nfts)
      // console.log(nfts)
      nfts.map((nft: any) => {
        // console.log(nft.metadata.id)
        // console.log(nft.getAddress())
      })
    })
  }

  const address = useAddress()
  const Filter = () => {
    // myNFTs.forEach((element: any, id: any) => {
    tempNFTs.forEach((ele: any, i: any) => {
      if (ele.owner == address) {
        // console.log(ele)
        let list = final.concat({ id: i, nft: ele })
        setFinal(list)
        // console.log(final)
      }
    })
    // })
  }

  const Burn = async () => {
    const tokenId = 0

    await nftCollection?.burn(tokenId).then((res: any) => {
      console.log('burn successful', res)
    })
  }

  const transfer = async (e: any) => {
    let tokenId = e
    console.log(tokenId)
    await nftCollection?.transfer(toAdd, tokenId)
  }
  const createListing = async (e: any) => {
    console.log(e.target.id)
    console.log('Starting to List NFT')
    const listing = {
      // address of the NFT contract the asset you want to list is on
      assetContractAddress: constants.collection,
      // token ID of the asset you want to list
      tokenId: e.target.id,
      // in how many seconds will the listing open up
      startTimeInSeconds: 0,
      // how long the listing will be open for
      listingDurationInSeconds: 86400,
      // how many of the asset you want to list
      quantity: 1,
      // address of the currency contract that will be used to pay for the listing
      currencyContractAddress: constants.token,
      // how much the asset will be sold for
      buyoutPricePerToken: '1.5',
    }

    try {
      const tx = await marketplace?.direct.createListing(listing)
      const receipt = tx?.receipt // the transaction receipt
      const listingId = tx?.id // the id of the newly created listing
      console.log(receipt, listingId)
    } catch (err) {
      console.log(err)
    }
    console.log('NFT Listed!')
  }

  return (
    <div className="mt-14 flex h-screen w-full pl-20 select-none items-center justify-center overflow-x-hidden overflow-y-hidden pb-14">
      <div className="flex h-full w-full flex-col items-center space-y-1 space-x-1 overflow-x-hidden overflow-y-hidden bg-bg px-1">
        <div className="mx-5 mt-1 flex h-10 w-full items-center justify-between self-start overflow-y-hidden text-lg text-white">
          <span className="">Your NFTs</span>
          <button
            onClick={() => getMyNFTs()}
            className="mr-10 rounded-lg bg-card-border px-4 text-bg"
          >
            GET
          </button>
          <button
            onClick={() => Burn()}
            className="mr-10 rounded-lg bg-card-border px-4 text-bg"
          >
            Burn
          </button>
          <button
            onClick={() => Filter()}
            className="mr-10 rounded-lg bg-card-border px-4 text-bg"
          >
            Filter
          </button>
          <button
            onClick={(e) => createListing(e)}
            className="mr-10 rounded-lg bg-card-border px-4 text-bg"
          >
            Create Listing
          </button>
        </div>
        <div className="grid h-screen w-full grid-cols-4 items-center space-y-1 space-x-1 overflow-y-scroll rounded-xl bg-bg p-5 pt-0 text-white scrollbar-thin scrollbar-thumb-card-border ">
          {tempNFTs.map((nft: any, id: any) => {
            if (nft.owner === address) {
              console.log(id, nft)
              return <NFT nft={nft} key={id} id={id} />
            }
          })}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                <div>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Enter Reciever's Address
                      </Dialog.Title>
                    </div>
                    <div className="flex w-full justify-center">
                      <input
                        type="text"
                        className="mt-4 h-10 w-full rounded border-2 border-blue-400 p-2 outline-none"
                        placeholder="address"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        className="flex h-10 w-24 items-center justify-center rounded bg-red-500 text-white"
                        onClick={() => setOpen(false)}
                      >
                        <span>Close</span>
                        <XCircleIcon className="h-6 w-6 pl-1" />
                      </button>
                      <button
                        className="flex h-10 w-24 items-center justify-center rounded bg-blue-500 text-white"
                        onClick={(e) => transfer(e)}
                      >
                        <span>Transfer</span>
                        <PaperAirplaneIcon className="h-6 w-6 rotate-45 pl-1 pb-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default MyNFTs
