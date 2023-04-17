import { WalletClass, walletAddresses } from '@/types/wallet'

export class KelprClass implements WalletClass {
  static icon: string = '/wallets/keplr.svg'
  address: walletAddresses = {}

  constructor() {
    if (!window.keplr) return
  }

  async connect() {
    try {
      const chainId = 'cosmoshub-4'
      await window.keplr.enable(chainId)

      const offlineSigner = window.keplr.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()

      this.address['gaia'] = accounts[0].address
    } catch (e) {
      return
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
