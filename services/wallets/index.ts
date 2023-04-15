import { AppDispatch } from '@/redux/store'
import { addWallet } from '@/redux/wallet'
import { Chains, walletAddresses } from '@/types/wallet'
import { getBalanceFromAddress } from '../balances/getBalance'
import { KelprClass } from './keplr'
import { KeystoreClass } from './keystore'
import { MetamaskClass } from './metamask'
import { XDEFIClass } from './xdefi'

export const WalletsProviders = () => {
  const balance = async (dispatch: AppDispatch, address: walletAddresses) => {
    Object.keys(address).forEach(async (key: string) => {
      const addressValue = address[key as Chains] as string
      const balance = await getBalanceFromAddress(key, addressValue)
      console.log({ addressValue, key, balance })
    })
  }

  return [
    {
      name: 'XDEFI',
      icon: XDEFIClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const xdefiClient = new XDEFIClass()
        await xdefiClient.connect()
        const address = xdefiClient.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'xdefi',
          })
        )

        balance(dispatch, address)
      },
    },
    {
      name: 'Keplr',
      icon: KelprClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const keplrClass = new KelprClass()
        await keplrClass.connect()
        const address = keplrClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'kelpr',
          })
        )

        balance(dispatch, address)
      },
    },
    {
      name: 'Metamask',
      icon: MetamaskClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const metamaskClass = new MetamaskClass()
        await metamaskClass.connect()
        const address = metamaskClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'metamask',
          })
        )

        balance(dispatch, address)
      },
    },
    {
      name: 'Keystore',
      icon: KeystoreClass.icon,
      connect: async (dispatch: AppDispatch, phrase?: string) => {
        const keystoreClass = new KeystoreClass(phrase ?? '')
        await keystoreClass.connect()
        const address = keystoreClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'keystore',
          })
        )

        balance(dispatch, address)
      },
    },
  ]
}
