import { AppDispatch } from '@/redux/store'
import { addWallet } from '@/redux/wallet'
import { Chains, walletAddresses } from '@/types/wallet'
import { getBalanceFromAddress } from '../common/getBalance'
import { KelprClass } from './keplr'
import { KeystoreClass } from './keystore'
import { LedgerClass } from './ledger'
import { MetamaskClass } from './metamask'
import { XDEFIClass } from './xdefi'

export const WalletsProviders = () => {
  const balance = async (dispatch: AppDispatch, address: walletAddresses) => {
    // const balances: any[] = []
    Object.keys(address).forEach(async (key: string) => {
      const addressValue = address[key as Chains] as string
      const balance = await getBalanceFromAddress(key, addressValue)
      console.log({ addressValue, key, balance })
      // balances.push(balance)
    })
    // console.log(balances)
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
    {
      name: 'Ledger',
      icon: LedgerClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const ledgerClass = new LedgerClass()
        await ledgerClass.connect()
        const address = ledgerClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'ledger',
          })
        )

        balance(dispatch, address)
      },
    },

    // TODO: WALLETS TO ADD: [TRUST WALLET, COINBASE WALLET, BRAVE WALLET, TREZOR]
  ]
}
