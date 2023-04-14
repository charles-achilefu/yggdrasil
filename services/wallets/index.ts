import { KelprClass } from './keplr'
import { MetamaskClass } from './metamask'
import { XDEFIClass } from './xdefi'

export const WalletsProviders = () => {
  return [
    {
      name: 'XDEFI',
      icon: XDEFIClass.icon,
      connect: async () => {
        const xdefiClient = new XDEFIClass()
        await xdefiClient.connect()
        console.log(xdefiClient.address)
      },
    },
    {
      name: 'Keplr',
      icon: KelprClass.icon,
      connect: async () => {
        const keplrClass = new KelprClass()
        await keplrClass.connect()
        console.log(keplrClass.address)
      },
    },
    {
      name: 'Metamask',
      icon: MetamaskClass.icon,
      connect: async () => {
        const metamaskClass = new MetamaskClass()
        await metamaskClass.connect()
        console.log(metamaskClass.address)
      },
    },
  ]
}
