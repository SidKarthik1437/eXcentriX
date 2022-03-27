import { atom } from 'recoil'

export const constantState = atom({
  key: 'constantState',
  default: {
    token: '0x5d41c00d651e2bFfa6e8b58f10A01D4e36ebE384',
    collection: '0x552d2aA38338982E642EF04b4c11Cf433B21798b',
    market: '0xdEfa05F51C564041B9437Ec429eceAe8DA2E0A12',
  },
})
