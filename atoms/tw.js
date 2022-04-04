import { atom } from 'recoil'

export const constantState = atom({
  key: 'constantState',
  default: {
    token: '0x48e85a79864B4D1D6f23886F6f8A27E2f9C66906',
    collection: '0xcBe4849bc882C8c77D0a8A93DB09c253980b5F3B',
    market: '0xbad06B9f1f7b433527602016A1966FBF2C5e28BB',
  },
})
