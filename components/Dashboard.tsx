import React, { useEffect, useState } from 'react'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'
import { useAddress, useNFTCollection } from '@thirdweb-dev/react'
import Header from './Header'
import { useRecoilState } from 'recoil'
import { constantState } from '../atoms/tw.js'

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    '6d09837e6eb3efde7b011a01f1755e937c432f4b5ec093bc40d21e03d37f7f48',
    ethers.getDefaultProvider(
      'https://polygon-mumbai.g.alchemy.com/v2/AcXFFT7NPRJ2ESL4cQB-wxRuqJ_Y9-6_'
    )
  )
)
    

const marketplace = sdk.getMarketplace(
  '0xdEfa05F51C564041B9437Ec429eceAe8DA2E0A12'
)
const token = '0x5d41c00d651e2bFfa6e8b58f10A01D4e36ebE384'
const collection = '0x552d2aA38338982E642EF04b4c11Cf433B21798b'

function Dashboard() {

  
  
  const address = useAddress()
  

  
  return (
    <div className="flex flex-col space-x-2">
      <div className="flex flex-col space-x-2">
        <span className=''>
        Your NFTS:
          
      </span>
        
      </div>
    </div>
  )
}

export default Dashboard
