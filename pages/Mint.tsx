import { useNFTCollection, useSDK } from '@thirdweb-dev/react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw'
import { CameraIcon } from '@heroicons/react/outline'

function Mint() {
  // const sdk = new ThirdwebSDK(
  //   new ethers.Wallet(
  //     '6d09837e6eb3efde7b011a01f1755e937c432f4b5ec093bc40d21e03d37f7f48',
  //     ethers.getDefaultProvider(
  //       'https://polygon-mumbai.g.alchemy.com/v2/AcXFFT7NPRJ2ESL4cQB-wxRuqJ_Y9-6_'
  //     )
  //   )
  // )
  const sdk = useSDK()
  const [constants] = useRecoilState(constantState)
  const nftCollection = useNFTCollection(constants.collection)

  const [Name, setName] = useState('')
  const [Description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef<any>(null)

  const Mint = async () => {
    console.log('starting')
    if (loading) return

    setLoading(true)

    const tx: any = await nftCollection
      ?.mint({
        name: Name,
        description: Description,
        image: selectedFile,
        properties: {},
      })
      .then((nft) => {
        console.log('MINTEDD: ', nft)
      })

    // const receipt = tx.receipt
    // const tokenId = tx.id
    // const nft = await tx.data()

    // console.log(receipt, tokenId, nft)

    setLoading(false)
    setSelectedFile(null)
    console.log('done')
  }
  const addImageToPost = (e: any) => {
    // console.log(e)
    // setSelectedFile(e.target.files[0])

    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result)
    }
  }
  console.log(selectedFile)

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-5/6 w-5/6 flex-col rounded-xl border border-white">
        <div className="mx-5 mt-1 flex h-10 w-full items-center justify-between self-start text-lg text-white">
          <span className="text-xl text-white">Mint an NFT</span>
          <button
            onClick={() => Mint()}
            className="mr-10 rounded-lg bg-card-border px-4 font-semibold text-white"
          >
            Mint
          </button>
        </div>
        <div className="relative h-full w-full items-center">
          <div className="absolute top-20 left-52 mx-auto flex h-10 w-full max-w-3xl items-center justify-between text-white">
            <span className="mb-20 text-center text-xl font-semibold">
              Image
            </span>
            <span className="mb-20 text-center text-xl font-semibold">
              Details
            </span>
          </div>
          <div className="row-span-5 grid h-full w-full grid-cols-5 items-center justify-center space-y-4 text-white">
            <div className="col-span-2 flex h-4/6 w-full flex-col items-center justify-around border-r">
              {selectedFile ? (
                <div className=" flex h-5/6 w-5/6 items-center justify-center rounded-xl">
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                    className="h-full cursor-pointer rounded-xl object-contain "
                  />
                </div>
              ) : (
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="mx-auto flex h-3/6 w-4/6 cursor-pointer flex-col items-center justify-center rounded-lg bg-card-bg"
                >
                  <CameraIcon
                    className="h-16 w-16 rounded-full bg-red-100 p-5 text-red-600"
                    aria-hidden="true"
                  />
                  <span>Upload a photo</span>
                  <input
                    type="file"
                    hidden
                    ref={filePickerRef}
                    onChange={addImageToPost}
                  />
                </div>
              )}
            </div>
            <div className="col-span-3 flex h-4/6 w-full  items-center justify-center">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between space-x-2 ">
                  <span className="w-full text-right font-semibold tracking-wide">
                    Name
                  </span>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded bg-card-border px-2 text-lg font-semibold outline-none ring-0 focus:ring-1 focus:ring-white "
                  />
                </div>
                <div className="flex items-center justify-between space-x-2 ">
                  <span className="w-full text-right font-semibold tracking-wide">
                    Description
                  </span>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-12 rounded bg-card-border px-2 text-lg font-semibold outline-none ring-0 focus:ring-1 focus:ring-white "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint
