import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'

export class BraveClass implements WalletClass {
  static icon: string = '/wallets/brave.svg'
  address: walletAddresses = {}

  constructor() {}

  canConnect() {
    if (window.navigator.brave === undefined)
      return generateError(
        'Please switch to Brave Browser to connect a Brave Wallet!'
      )

    if (!(window.ethereum as any).isBraveWallet)
      return generateError(
        'Please change your Brave Browser default Ethereum wallet to Brave Wallet and refresh the page.'
      )

    return generateSuccess(
      'All checks passed, ready to connect with your Brave wallet.'
    )
  }

  async connect() {
    try {
      const accounts = await (window.ethereum as any).request({
        method: 'eth_requestAccounts',
      })

      this.address['eth'] = accounts[0]
      this.address['avax'] = accounts[0]

      return generateSuccess('Brave wallet has been connected!')
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
