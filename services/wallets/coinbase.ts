import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'
import CoinbaseWalletSDK, { CoinbaseWalletProvider } from '@coinbase/wallet-sdk'

export class CoinbaseClass implements WalletClass {
  static icon: string = '/wallets/coinbase.svg'
  address: walletAddresses = {}
  coinbaseWallet: CoinbaseWalletProvider

  constructor() {
    const coinbaseWallet = new CoinbaseWalletSDK({
      appName: 'Yggdrasil',
      darkMode: true,
      overrideIsMetaMask: false,
      headlessMode: true,
    })
    this.coinbaseWallet = coinbaseWallet.makeWeb3Provider()
  }

  canConnect() {
    let isCoinbaseWallet = false

    if ((window.ethereum as any).providers?.length) {
      ;(window.ethereum as any).providers.some(
        (provider: { isCoinbaseWallet: boolean }) => {
          if (provider.isCoinbaseWallet) {
            isCoinbaseWallet = true
            return true
          }
        }
      )
    }

    if (!isCoinbaseWallet)
      return generateError('Please install the Coinbase Wallet extension.')

    return generateSuccess(
      'All checks passed, ready to connect with your Coinbase wallet.'
    )
  }

  async connect() {
    try {
      const accounts: string[] = await this.coinbaseWallet.request({
        method: 'eth_requestAccounts',
      })

      this.address['eth'] = accounts[0]
      this.address['avax'] = accounts[0]
      return generateSuccess('Coinbase Wallet has been connected!')
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
