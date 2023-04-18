import { WalletClass, walletAddresses } from '@/types/wallet'

export class BraveClass implements WalletClass {
  static icon: string = '/wallets/brave.svg'
  address: walletAddresses = {}
  isBraveWallet: boolean = false

  constructor() {
    this.isBraveWallet = (window.ethereum as any).isBraveWallet
  }

  async connect() {
    try {
      if (!this.isBraveWallet) return

      const accounts = await (window.ethereum as any).request({
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
