import { setNotification } from '@/redux/notification'
import { AppDispatch } from '@/redux/store'
import { updateBalance } from '@/redux/tokens'
import { addWallet } from '@/redux/wallet'
import { Chains, walletAddresses } from '@/types/wallet'
import { isError } from '@/utils/notification'
import { getBalanceFromAddress } from '../common/getBalance'
import { BraveClass } from './brave'
import { CoinbaseClass } from './coinbase'
import { KelprClass } from './keplr'
import { KeystoreClass } from './keystore'
import { LedgerClass } from './ledger'
import { MetamaskClass } from './metamask'
import { TrustwalletClass } from './trustwallet'
import { XDEFIClass } from './xdefi'

export const WalletsProviders = () => {
  const balance = async (dispatch: AppDispatch, address: walletAddresses) => {
    Object.keys(address).forEach(async (key: string) => {
      const addressValue = address[key as Chains] as string
      const balance = await getBalanceFromAddress(key, addressValue)
      dispatch(updateBalance(balance))
    })
  }

  return [
    {
      name: 'XDEFI',
      icon: XDEFIClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const xdefiClient = new XDEFIClass()
        const canConnectNotification = xdefiClient.canConnect()

        if (isError(canConnectNotification))
          return dispatch(setNotification(canConnectNotification))

        const connectNotification = await xdefiClient.connect()

        if (isError(connectNotification))
          return dispatch(setNotification(connectNotification))

        const address = xdefiClient.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'xdefi',
          })
        )

        dispatch(setNotification(connectNotification))

        balance(dispatch, address)
      },
      send: async (dispatch: AppDispatch) => {},
    },
    {
      name: 'Keplr',
      icon: KelprClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const keplrClass = new KelprClass()
        const canConnectNotification = keplrClass.canConnect()

        if (isError(canConnectNotification))
          return dispatch(setNotification(canConnectNotification))

        const connectNotification = await keplrClass.connect()

        if (isError(connectNotification))
          return dispatch(setNotification(connectNotification))

        const address = keplrClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'keplr',
          })
        )

        dispatch(setNotification(connectNotification))

        balance(dispatch, address)
      },
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
    },
    {
      name: 'Metamask',
      icon: MetamaskClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const metamaskClass = new MetamaskClass()
        const canConnectNotification = metamaskClass.canConnect()

        if (isError(canConnectNotification))
          return dispatch(setNotification(canConnectNotification))

        const connectNotification = await metamaskClass.connect()

        if (isError(connectNotification))
          return dispatch(setNotification(connectNotification))

        const address = metamaskClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'metamask',
          })
        )

        dispatch(setNotification(connectNotification))

        balance(dispatch, address)
      },
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
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
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
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
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
    },
    {
      name: 'Coinbase',
      icon: CoinbaseClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const coinbaseClass = new CoinbaseClass()
        const canConnectNotification = coinbaseClass.canConnect()

        if (isError(canConnectNotification))
          return dispatch(setNotification(canConnectNotification))

        const connectNotification = await coinbaseClass.connect()

        if (isError(connectNotification))
          return dispatch(setNotification(connectNotification))

        const address = coinbaseClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'coinbase',
          })
        )

        dispatch(setNotification(connectNotification))

        balance(dispatch, address)
      },
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
    },
    {
      name: 'Brave',
      icon: BraveClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const braveClass = new BraveClass()
        const canConnectNotification = braveClass.canConnect()

        if (isError(canConnectNotification))
          return dispatch(setNotification(canConnectNotification))

        const connectNotification = await braveClass.connect()

        if (isError(connectNotification))
          return dispatch(setNotification(connectNotification))

        const address = braveClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'brave',
          })
        )

        dispatch(setNotification(connectNotification))

        balance(dispatch, address)
      },
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
    },
    // {
    //   name: 'Wallet Connect',
    //   icon: WalletconnectClass.icon,
    //   connect: async (dispatch: AppDispatch) => {
    //     const walletconnectClass = new WalletconnectClass()
    //     const canConnectNotification = walletconnectClass.canConnect()

    //     if (isError(canConnectNotification))
    //       return dispatch(setNotification(canConnectNotification))

    //     const connectNotification = await walletconnectClass.connect()

    //     if (isError(connectNotification))
    //       return dispatch(setNotification(connectNotification))

    //     const address = walletconnectClass.getAddress()

    //     dispatch(
    //       addWallet({
    //         address,
    //         type: 'walletconnect',
    //       })
    //     )

    //     balance(dispatch, address)
    //   },
    // },
    {
      name: 'Trust Wallet',
      icon: TrustwalletClass.icon,
      connect: async (dispatch: AppDispatch) => {
        const trustWalletClass = new TrustwalletClass()
        const canConnectNotification = trustWalletClass.canConnect()

        if (isError(canConnectNotification))
          return dispatch(setNotification(canConnectNotification))

        const connectNotification = await trustWalletClass.connect()

        if (isError(connectNotification))
          return dispatch(setNotification(connectNotification))

        const address = trustWalletClass.getAddress()

        dispatch(
          addWallet({
            address,
            type: 'trustwallet',
          })
        )

        dispatch(setNotification(connectNotification))

        balance(dispatch, address)
      },
      swap: async (dispatch: AppDispatch) => {},
      send: async (dispatch: AppDispatch) => {},
    },
  ]
}
