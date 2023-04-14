import { AppDispatch } from '@/redux/store'
import { addWallet } from '@/redux/wallet'
import { KelprClass } from './keplr'
import { MetamaskClass } from './metamask'
import { XDEFIClass } from './xdefi'

export const WalletsProviders = () => {
  return [
    {
      name: 'XDEFI',
      icon: XDEFIClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const xdefiClient = new XDEFIClass()
        await xdefiClient.connect()
        dispatch(
          addWallet({
            address: xdefiClient.getAddress(),
            type: 'xdefi',
          })
        )
      },
    },
    {
      name: 'Keplr',
      icon: KelprClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const keplrClass = new KelprClass()
        await keplrClass.connect()
        dispatch(
          addWallet({
            address: keplrClass.getAddress(),
            type: 'kelpr',
          })
        )
      },
    },
    {
      name: 'Metamask',
      icon: MetamaskClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const metamaskClass = new MetamaskClass()
        await metamaskClass.connect()
        dispatch(
          addWallet({
            address: metamaskClass.getAddress(),
            type: 'metamask',
          })
        )
      },
    },
  ]
}
