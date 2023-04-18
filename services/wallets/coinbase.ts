import { WalletClass, walletAddresses } from '@/types/wallet'
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
    })
    this.coinbaseWallet = coinbaseWallet.makeWeb3Provider()
  }

  async connect() {
    try {
      const accounts: string[] = await this.coinbaseWallet.request({
        method: 'eth_requestAccounts',
      })

      if (accounts) {
        this.address['eth'] = accounts[0]
        this.address['avax'] = accounts[0]
      }
    } catch (e) {
      return
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
